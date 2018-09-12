/**
 * This class is generated by jOOQ
 */
package com.parallax.server.blocklyprop.db.generated.tables;


import com.parallax.server.blocklyprop.db.generated.Blocklyprop;
import com.parallax.server.blocklyprop.db.generated.Keys;
import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Identity;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.TableImpl;


/**
 * Customer-facing alerts
 */
@Generated(
	value = {
		"http://www.jooq.org",
		"jOOQ version:3.7.4"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Motd extends TableImpl<MotdRecord> {

	private static final long serialVersionUID = 771867904;

	/**
	 * The reference instance of <code>blocklyprop.motd</code>
	 */
	public static final Motd MOTD = new Motd();

	/**
	 * The class holding records for this type
	 */
	@Override
	public Class<MotdRecord> getRecordType() {
		return MotdRecord.class;
	}

	/**
	 * The column <code>blocklyprop.motd.id</code>.
	 */
	public final TableField<MotdRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.motd.message_text</code>.
	 */
	public final TableField<MotdRecord, String> MESSAGE_TEXT = createField("message_text", org.jooq.impl.SQLDataType.VARCHAR.length(2000).nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.motd.message_html</code>.
	 */
	public final TableField<MotdRecord, String> MESSAGE_HTML = createField("message_html", org.jooq.impl.SQLDataType.VARCHAR.length(2000), this, "");

	/**
	 * The column <code>blocklyprop.motd.notes</code>.
	 */
	public final TableField<MotdRecord, String> NOTES = createField("notes", org.jooq.impl.SQLDataType.VARCHAR.length(4000), this, "");

	/**
	 * The column <code>blocklyprop.motd.enabled</code>.
	 */
	public final TableField<MotdRecord, Byte> ENABLED = createField("enabled", org.jooq.impl.SQLDataType.TINYINT.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.motd.is_deleted</code>.
	 */
	public final TableField<MotdRecord, Byte> IS_DELETED = createField("is_deleted", org.jooq.impl.SQLDataType.TINYINT.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.motd.create_date</code>.
	 */
	public final TableField<MotdRecord, Timestamp> CREATE_DATE = createField("create_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.motd.last_change_date</code>.
	 */
	public final TableField<MotdRecord, Timestamp> LAST_CHANGE_DATE = createField("last_change_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.motd.message_enable_time</code>.
	 */
	public final TableField<MotdRecord, Timestamp> MESSAGE_ENABLE_TIME = createField("message_enable_time", org.jooq.impl.SQLDataType.TIMESTAMP, this, "");

	/**
	 * The column <code>blocklyprop.motd.message_disable_time</code>.
	 */
	public final TableField<MotdRecord, Timestamp> MESSAGE_DISABLE_TIME = createField("message_disable_time", org.jooq.impl.SQLDataType.TIMESTAMP, this, "");

	/**
	 * Create a <code>blocklyprop.motd</code> table reference
	 */
	public Motd() {
		this("motd", null);
	}

	/**
	 * Create an aliased <code>blocklyprop.motd</code> table reference
	 */
	public Motd(String alias) {
		this(alias, MOTD);
	}

	private Motd(String alias, Table<MotdRecord> aliased) {
		this(alias, aliased, null);
	}

	private Motd(String alias, Table<MotdRecord> aliased, Field<?>[] parameters) {
		super(alias, Blocklyprop.BLOCKLYPROP, aliased, parameters, "Customer-facing alerts");
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Identity<MotdRecord, Long> getIdentity() {
		return Keys.IDENTITY_MOTD;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UniqueKey<MotdRecord> getPrimaryKey() {
		return Keys.KEY_MOTD_PRIMARY;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<UniqueKey<MotdRecord>> getKeys() {
		return Arrays.<UniqueKey<MotdRecord>>asList(Keys.KEY_MOTD_PRIMARY);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Motd as(String alias) {
		return new Motd(alias, this);
	}

	/**
	 * Rename this table
	 */
	public Motd rename(String name) {
		return new Motd(name, null);
	}
}