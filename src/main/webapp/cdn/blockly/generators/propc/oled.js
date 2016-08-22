/**
 * Visual Blocks Language
 *
 * Copyright 2016 Vale Tolpegin
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
 * @fileoverview Generating Prop-C & UI for OLED blocks.
 * @author valetolpegin@gmail.com (Vale Tolpegin)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.oled_initialize = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        // Field order DIN, CLK, CS, D/C, RES
        this.appendDummyInput()
            .appendField("OLED initialize")
            .appendField("DIN")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "DIN")
            .appendField("CLK")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK")
            .appendField("CS")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "CS")
            .appendField("D/C")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "DC")
            .appendField("RES")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "RES");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_font_loader = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("OLED font loader (EEPROM only)");
    }
};

Blockly.Blocks.oled_clear_screen = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("clear screen");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_draw_circle = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("POINT_X")
            .setCheck("Number")
            .appendField("draw circle at");
        this.appendValueInput("POINT_Y")
            .setCheck(null)
            .appendField(",");
        this.appendValueInput("RADIUS")
            .setCheck("Number")
            .appendField("radius");
        this.appendDummyInput()
        this.appendValueInput('COLOR')
            .setCheck('Number')
            .appendField("color");
        this.appendDummyInput()
            .appendField("fill")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "ck_fill");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_draw_line = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("X_ONE")
            .setCheck('Number')
            .appendField("draw line point one");
        this.appendValueInput("Y_ONE")
            .setCheck('Number')
            .appendField(",");
        this.appendValueInput("X_TWO")
            .setCheck('Number')
            .appendField("point two");
        this.appendValueInput("Y_TWO")
            .setCheck('Number')
            .appendField(",");
        this.appendValueInput('COLOR')
            .setCheck('Number')
            .appendField("color");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_draw_pixel = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("X_AXIS")
            .setCheck('Number')
            .appendField("draw pixel at");
        this.appendValueInput("Y_AXIS")
            .setCheck('Number')
            .appendField(",");
        this.appendValueInput('COLOR')
            .setCheck('Number')
            .appendField("color");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_draw_triangle = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        // First x/y coordinates
        this.appendValueInput("POINT_X0")
            .setCheck(null)
            .appendField("draw triangle at 1(x)");
        this.appendValueInput("POINT_Y0")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("(y)");
        // Second x/y coordinates
        this.appendValueInput("POINT_X1")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("2(x)");
        this.appendValueInput("POINT_Y1")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("(y)");
        // Third x/y coordinates
        this.appendValueInput("POINT_X2")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("3(x)");
        this.appendValueInput("POINT_Y2")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("(y)");
        // Color picker control
        this.appendValueInput('COLOR')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("color");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("fill")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "ck_fill");

        // Other details
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('set coordinates to draw a triangle');
    }
};

Blockly.Blocks.oled_draw_rectangle = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("POINT_X")
            .setCheck("Number")
            .appendField("draw")
            .appendField(new Blockly.FieldDropdown([
                ["rectangle", "REG_RECTANGLE"],
                ["round rectangle", "ROUND_RECTANGLE"]
                ]), "rect_round")
            .appendField("at");
        this.appendValueInput("POINT_Y")
            .setCheck("Number")
            .appendField(",");
        this.appendValueInput("RECT_WIDTH")
            .setCheck(null)
            .appendField("width");
        this.appendValueInput("RECT_HEIGHT")
            .setCheck(null)
            .appendField("height");
        // Color picker control
        this.appendValueInput('COLOR')
            .setCheck('Number')
            .appendField("color");
        this.appendDummyInput()
            .appendField("fill")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "ck_fill");

        // Other details
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('set coordinates to draw a rectangle');
    }
};

Blockly.Blocks.oled_text_size = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("text size")
            .appendField(new Blockly.FieldDropdown([
                ["small", "TEXT_SMALL"],
                ["medium", "TEXT_MEDIUM"],
                ["large", "TEXT_LARGE"]]), "size_select");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_text_color = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('FONT_COLOR')
            .setCheck('Number')
            .appendField("font color");
        this.appendValueInput('BACKGROUND_COLOR')
            .setCheck('Number')
            .appendField("background color");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_get_max_height = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("max height")

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
    }
};

Blockly.Blocks.oled_get_max_width = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("max width")

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.oled_initialize = function () {
    var cs_pin = this.getFieldValue("CS");
    var dc_pin = this.getFieldValue("DC");
    var din_pin = this.getFieldValue("DIN");
    var clk_pin = this.getFieldValue("CLK");
    var res_pin = this.getFieldValue("RES");

    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';
    Blockly.propc.setups_["oled"] = 'oledc_init(' + din_pin + ', ' + clk_pin + ', ' + cs_pin + ', ' + dc_pin + ', ' + res_pin + ', 2);';

    return '';
};


Blockly.propc.oled_font_loader = function () {
    Blockly.propc.definitions_["oledfonts"] = '#include "oledc_fontLoader.h"';

    var code = 'oledc_fontLoader();';
    return code;
};


Blockly.propc.oled_clear_screen = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

    // Emit code to clear the screen
    var code = 'oledc_clear(0, 0, oledc_getWidth(), oledc_getHeight() );';
    return code;
};

Blockly.propc.oled_draw_circle = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

  var point_x0 = Blockly.propc.valueToCode(this, 'POINT_X', Blockly.propc.ORDER_NONE);
  var point_y0 = Blockly.propc.valueToCode(this, 'POINT_Y', Blockly.propc.ORDER_NONE);
  var radius = Blockly.propc.valueToCode(this, 'RADIUS', Blockly.propc.ORDER_NONE);

  var color_mask = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE));

  var color_red = parseInt(color_mask[1], 16);
  var color_green = parseInt(color_mask[2], 16);
  var color_blue = parseInt(color_mask[3], 16);

  var checkbox = this.getFieldValue('ck_fill');
  var code;

  if (checkbox === 'TRUE') {
      code = 'oledc_fillCircle(';
  } else {
      code = 'oledc_drawCircle(';
  }

  code += point_x0 + ', ' + point_y0 + ', ';
  code += radius + ', ';
  code += 'oledc_color565('+ color_red + ', ' + color_green + ', ' + color_blue + ')';
  code += ');';

  return code;
};

Blockly.propc.oled_draw_line = function () {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

    var x_one = Blockly.propc.valueToCode(this, "X_ONE", Blockly.propc.ORDER_NONE);
    var y_one = Blockly.propc.valueToCode(this, "Y_ONE", Blockly.propc.ORDER_NONE);
    var x_two = Blockly.propc.valueToCode(this, "X_TWO", Blockly.propc.ORDER_NONE);
    var y_two = Blockly.propc.valueToCode(this, "Y_TWO", Blockly.propc.ORDER_NONE);

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE));
    var color_red = parseInt(result[1], 16);
    var color_green = parseInt(result[2], 16);
    var color_blue = parseInt(result[3], 16);

    var code = 'oledc_drawLine(' + x_one + ', ' + y_one + ', ' + x_two + ', ' + y_two + ', oledc_color565(' + color_red + ', ' + color_green + ', ' + color_blue + '));\n';
    return code;
};

Blockly.propc.oled_draw_pixel = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

    var point_x = Blockly.propc.valueToCode(this, 'X_AXIS', Blockly.propc.ORDER_ATOMIC);
    var point_y = Blockly.propc.valueToCode(this, 'Y_AXIS', Blockly.propc.ORDER_ATOMIC);
    //var color_name = block.getFieldValue('NAME');

    var color_mask = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE));
    var color_red = parseInt(color_mask[1], 16);
    var color_green = parseInt(color_mask[2], 16);
    var color_blue = parseInt(color_mask[3], 16);

    // TODO: Assemble JavaScript into code variable.
    var code = 'oledc_drawPixel(' + point_x + ', ' + point_y + ', ' +
            'oledc_color565(' + color_red + ', ' + color_green + ', ' + color_blue + '));';
    return code;
};

Blockly.propc.oled_draw_triangle = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

  var point_x0 = Blockly.propc.valueToCode(this, 'POINT_X0', Blockly.propc.ORDER_NONE);
  var point_y0 = Blockly.propc.valueToCode(this, 'POINT_Y0', Blockly.propc.ORDER_NONE);
  var point_x1 = Blockly.propc.valueToCode(this, 'POINT_X1', Blockly.propc.ORDER_NONE);
  var point_y1 = Blockly.propc.valueToCode(this, 'POINT_Y1', Blockly.propc.ORDER_NONE);
  var point_x2 = Blockly.propc.valueToCode(this, 'POINT_X2', Blockly.propc.ORDER_NONE);
  var point_y2 = Blockly.propc.valueToCode(this, 'POINT_Y2', Blockly.propc.ORDER_NONE);

  var color_mask = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE));

  var color_red = parseInt(color_mask[1], 16);
  var color_green = parseInt(color_mask[2], 16);
  var color_blue = parseInt(color_mask[3], 16);

  var checkbox = this.getFieldValue('ck_fill');
  var code;

  if (checkbox === 'TRUE') {
      code = 'oledc_fillTriangle(';
  } else {
      code = 'oledc_drawTriangle(';
  }

  code += point_x0 + ', ' + point_y0 + ', ';
  code += point_x1 + ', ' + point_y1 + ', ';
  code += point_x2 + ', ' + point_y2 + ', ';
  code += 'oledc_color565('+ color_red + ', ' + color_green + ', ' + color_blue + ')';
  code += ');';

  return code;
};

Blockly.propc.oled_draw_rectangle = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

  var corners = this.getFieldValue('rect_round');
  var point_x = Blockly.propc.valueToCode(this, 'POINT_X', Blockly.propc.ORDER_NONE);
  var point_y = Blockly.propc.valueToCode(this, 'POINT_Y', Blockly.propc.ORDER_NONE);
  var width = Blockly.propc.valueToCode(this, 'RECT_WIDTH', Blockly.propc.ORDER_NONE);
  var height = Blockly.propc.valueToCode(this, 'RECT_HEIGHT', Blockly.propc.ORDER_NONE);

  var color_mask = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE));

  var color_red = parseInt(color_mask[1], 16);
  var color_green = parseInt(color_mask[2], 16);
  var color_blue = parseInt(color_mask[3], 16);

  var checkbox = this.getFieldValue('ck_fill');
  var code;

  if (corners === 'REG_RECTANGLE') {
      if (checkbox === 'TRUE') {
          code = 'oledc_fillRect(';
          }
      else {
          code = 'oledc_drawRect(';
          }

      code += point_x + ', ' + point_y + ', ';
      code += width + ', ' + height + ', ';
      code += 'oledc_color565('+ color_red + ', ' + color_green + ', ' + color_blue + ')';
    }
    else { // Rounded rectangle
        if (checkbox === 'TRUE') {
            code = 'oledc_fillRoundRect(';
        }
        else {
            code = 'oledc_drawRoundRect(';
        }

        code += point_x + ', ' + point_y + ', ';
        code += width + ', ' + height + ', ';
        code += '((' + width + ') + (' + height + ') / 20),';
        code += 'oledc_color565('+ color_red + ', ' + color_green + ', ' + color_blue + ')';
    }

  code += ');';

  return code;
};

Blockly.propc.oled_text_size = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

    var dropdown_size_select = this.getFieldValue('size_select');

    // TODO: Update constants when new oledc library is published
    var code = 'oledc_setTextSize(';

    switch(dropdown_size_select) {
        case 'TEXT_SMALL':
            code += 'SMALL';
            break;
        case 'TEXT_MEDIUM':
            code+= 'MEDIUM';
            break;
        case 'TEXT_LARGE':
            code += 'LARGE';
            break;
        default:
            code += 'SMALL';
    }
    code += ');';
    return code;
};


Blockly.propc.oled_text_color = function() {
    var code = 'oledc_setTextColor(';

    var color_mask = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Blockly.propc.valueToCode(this, 'FONT_COLOR', Blockly.propc.ORDER_NONE));
    var color_red = parseInt(color_mask[1], 16);
    var color_green = parseInt(color_mask[2], 16);
    var color_blue = parseInt(color_mask[3], 16);

    code += 'oledc_color565('+ color_red + ', ' + color_green + ', ' + color_blue + '), ';

    color_mask = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Blockly.propc.valueToCode(this, 'BACKGROUND_COLOR', Blockly.propc.ORDER_NONE));
    color_red = parseInt(color_mask[1], 16);
    color_green = parseInt(color_mask[2], 16);
    color_blue = parseInt(color_mask[3], 16);

    code += 'oledc_color565('+ color_red + ', ' + color_green + ', ' + color_blue + '));';

    return code;
};

Blockly.propc.oled_get_max_height = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

    // Emit code to clear the screen
    var code = 'oledc_getHeight()';

    // Return function call with surrounding parens:
    //    oledc_drawPixel(..., (oledc_getWidth()), ...);
    return [code, Blockly.propc.ORDER_NONE];
};


Blockly.propc.oled_get_max_width = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';

    // Emit code to clear the screen
    var code = 'oledc_getWidth()';
    return [code, Blockly.propc.ORDER_NONE];
};
