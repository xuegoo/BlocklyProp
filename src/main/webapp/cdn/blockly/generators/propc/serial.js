/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.serial_open = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("serial init")
                .appendField("rxPIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "RXPIN")
                .appendField("txPIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "TXPIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"]]), "BAUD");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.serial_tx_byte = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("serial transmit");
        this.appendValueInput('VALUE', Number)
                .setCheck('Number');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.serial_send_text = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));

        this.appendDummyInput("")
                .appendField("serial transmit")
                .appendField(quotes.newQuote_(true))
                .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                .appendField(quotes.newQuote_(false));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.serial_rx_byte = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("serial read byte");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.xbee_setup = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Xbee setup")
                .appendField("DO pin#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DO_PIN')
                .appendField("DI pin#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DI_PIN');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.xbee_transmit = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Xbee transmit data")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('BUFFER')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER'))) {
            this.setTitleValue(newName, 'BUFFER');
        }
    }
};

Blockly.Blocks.xbee_receive = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Xbee receive data and store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('BUFFER')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER'))) {
            this.setTitleValue(newName, 'BUFFER');
        }
    }
};

Blockly.propc.serial_open = function () {
    var dropdown_rx_pin = this.getFieldValue('RXPIN');
    var dropdown_tx_pin = this.getFieldValue('TXPIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    Blockly.propc.setups_['setup_fdserial'] = 'fdser = fdserial_open(' + dropdown_rx_pin + ', ' + dropdown_tx_pin + ', 0, ' + baud + ');';

    return '';
};

Blockly.propc.serial_tx_byte = function () {
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_UNARY_PREFIX) || '0';

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '';
    }

    return 'fdserial_txChar(fdser, ' + value + ');\n';
};

Blockly.propc.serial_send_text = function () {
    var text = this.getFieldValue('TEXT');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '';
    }

    return 'writeLine(fdser, "' + text + '");\n';
};

Blockly.propc.serial_rx_byte = function () {
    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '';
    }

    return ['fdserial_rxCheck(fdser)', Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.xbee_setup = function () {
    var do_pin = this.getFieldValue('DO_PIN');
    var di_pin = this.getFieldValue('DI_PIN');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    Blockly.propc.global_vars_["xbee"] = "fdserial *xbee;";
    Blockly.propc.setups["xbee"] = 'fdserial_open(' + do_pin + ', ' + di_pin + ', 0, 9600);\n';

    return '';
};

Blockly.propc.xbee_transmit = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    var code = 'dprint(xbee, "%d\n", ' + data + ');\n';
    return code;
};

Blockly.propc.xbee_receive = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    var code = 'dscan(xbee, "%d", &' + data + ');\n';
    return code;
};
