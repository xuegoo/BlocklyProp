/**
 * This class is generated by jOOQ
 */
package com.parallax.server.blocklyprop.db.generated.tables.records;


import com.parallax.server.blocklyprop.db.generated.tables.Admin;

import java.sql.Timestamp;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record5;
import org.jooq.Row5;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
	value = {
		"http://www.jooq.org",
		"jOOQ version:3.7.4"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class AdminRecord extends UpdatableRecordImpl<AdminRecord> implements Record5<Long, Integer, String, String, Timestamp> {

	private static final long serialVersionUID = -1301222323;

	/**
	 * Setter for <code>blocklyprop.admin.id</code>.
	 */
	public void setId(Long value) {
		setValue(0, value);
	}

	/**
	 * Getter for <code>blocklyprop.admin.id</code>.
	 */
	public Long getId() {
		return (Long) getValue(0);
	}

	/**
	 * Setter for <code>blocklyprop.admin.db_version</code>.
	 */
	public void setDbVersion(Integer value) {
		setValue(1, value);
	}

	/**
	 * Getter for <code>blocklyprop.admin.db_version</code>.
	 */
	public Integer getDbVersion() {
		return (Integer) getValue(1);
	}

	/**
	 * Setter for <code>blocklyprop.admin.db_script</code>.
	 */
	public void setDbScript(String value) {
		setValue(2, value);
	}

	/**
	 * Getter for <code>blocklyprop.admin.db_script</code>.
	 */
	public String getDbScript() {
		return (String) getValue(2);
	}

	/**
	 * Setter for <code>blocklyprop.admin.notes</code>.
	 */
	public void setNotes(String value) {
		setValue(3, value);
	}

	/**
	 * Getter for <code>blocklyprop.admin.notes</code>.
	 */
	public String getNotes() {
		return (String) getValue(3);
	}

	/**
	 * Setter for <code>blocklyprop.admin.last_change_date</code>.
	 */
	public void setLastChangeDate(Timestamp value) {
		setValue(4, value);
	}

	/**
	 * Getter for <code>blocklyprop.admin.last_change_date</code>.
	 */
	public Timestamp getLastChangeDate() {
		return (Timestamp) getValue(4);
	}

	// -------------------------------------------------------------------------
	// Primary key information
	// -------------------------------------------------------------------------

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Record1<Long> key() {
		return (Record1) super.key();
	}

	// -------------------------------------------------------------------------
	// Record5 type implementation
	// -------------------------------------------------------------------------

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Row5<Long, Integer, String, String, Timestamp> fieldsRow() {
		return (Row5) super.fieldsRow();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Row5<Long, Integer, String, String, Timestamp> valuesRow() {
		return (Row5) super.valuesRow();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Long> field1() {
		return Admin.ADMIN.ID;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Integer> field2() {
		return Admin.ADMIN.DB_VERSION;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<String> field3() {
		return Admin.ADMIN.DB_SCRIPT;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<String> field4() {
		return Admin.ADMIN.NOTES;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Timestamp> field5() {
		return Admin.ADMIN.LAST_CHANGE_DATE;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Long value1() {
		return getId();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Integer value2() {
		return getDbVersion();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String value3() {
		return getDbScript();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String value4() {
		return getNotes();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Timestamp value5() {
		return getLastChangeDate();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public AdminRecord value1(Long value) {
		setId(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public AdminRecord value2(Integer value) {
		setDbVersion(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public AdminRecord value3(String value) {
		setDbScript(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public AdminRecord value4(String value) {
		setNotes(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public AdminRecord value5(Timestamp value) {
		setLastChangeDate(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public AdminRecord values(Long value1, Integer value2, String value3, String value4, Timestamp value5) {
		value1(value1);
		value2(value2);
		value3(value3);
		value4(value4);
		value5(value5);
		return this;
	}

	// -------------------------------------------------------------------------
	// Constructors
	// -------------------------------------------------------------------------

	/**
	 * Create a detached AdminRecord
	 */
	public AdminRecord() {
		super(Admin.ADMIN);
	}

	/**
	 * Create a detached, initialised AdminRecord
	 */
	public AdminRecord(Long id, Integer dbVersion, String dbScript, String notes, Timestamp lastChangeDate) {
		super(Admin.ADMIN);

		setValue(0, id);
		setValue(1, dbVersion);
		setValue(2, dbScript);
		setValue(3, notes);
		setValue(4, lastChangeDate);
	}
}
