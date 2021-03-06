/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao.impl;

import com.google.inject.Singleton;
import com.google.inject.Inject;

import org.jooq.DSLContext;
import java.sql.Timestamp;
import java.util.List;

import org.joda.time.DateTime;
import com.parallax.server.blocklyprop.db.dao.MotdDao;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Manage the message of the day records
 * 
 * @author Jim Ewald
 */

@Singleton
public class MotdDaoImpl implements MotdDao {
    
    /**
     * Logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(MotdDaoImpl.class);

    /**
     * Database connection context
     */
    private DSLContext create;
    
    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    
    /**
     * Create a new message of the day
     * 
     * @param message
     * @param enableDate
     * @param disableDate
     * @return 
     */
    @Override
    public MotdRecord create(
            String message,
            DateTime enableDate,
            DateTime disableDate) {
        
        LOG.info("Creating a MOTD record");
        
        MotdRecord record = null;
        
        
        try {
            Timestamp enableTimestamp = new Timestamp(enableDate.getMillis());
            Timestamp disableTimestamp = new Timestamp(disableDate.getMillis());
        
            LOG.info("Motd Details: Message: {}..., Start: {}, End:{}",
                    message.substring(0,20),
                    enableTimestamp.toString(),
                    disableTimestamp.toString());

            // Insert a record
            record = create                    
                    .insertInto(Tables.MOTD,
                            Tables.MOTD.MESSAGE_TEXT,
                            Tables.MOTD.MESSAGE_DISABLE_TIME,
                            Tables.MOTD.MESSAGE_ENABLE_TIME)
                    .values(message,
                            enableTimestamp,
                            disableTimestamp                        
                    )
                    .returning()
                    .fetchOne();
        }
        catch (org.jooq.exception.DataAccessException sqex) {
            LOG.error("Database error encountered {}", sqex.getMessage());
            return null;
        }
        catch (Exception ex) {
            LOG.error("Unexpected exception creating a project record");
            LOG.error("Error Message: {}", ex.getMessage());
            return null;
        }
        
        return record;
    }

    @Override
    public MotdRecord getFirst() {

        MotdRecord record = null;

        try {
            LOG.info("Getting first active");
        
            record = create
                .selectFrom(Tables.MOTD)
                .where(Tables.MOTD.ENABLED.isTrue().and(Tables.MOTD.IS_DELETED.isFalse()))
                .orderBy(Tables.MOTD.MESSAGE_ENABLE_TIME.desc())
                .fetchOne();
        }
        catch (NullPointerException ex) {
            LOG.info("Null pointer exception on GetFirstMotd");
            LOG.info("Message: {}", ex.getMessage());
        }
        return record;
    }
    
    
    /**
     * Retrieve a single message of the day
     * 
     * @param idMotd
     * 
     * @return a single MotdRecord or null if record is not found
     */
    @Override
    public MotdRecord get(Long idMotd) {
        
        LOG.info("Getting Motd record {}", idMotd);
        
        MotdRecord record = null;
        
        if (idMotd == 0L) {
            // Get the most recent, active message
            record = create
                .selectFrom(Tables.MOTD)
                .where(Tables.MOTD.ENABLED.isTrue().and(Tables.MOTD.IS_DELETED.isFalse()))
                .orderBy(Tables.MOTD.MESSAGE_ENABLE_TIME.desc())
                .fetchOne();
        } else
        {
            record = create
                .selectFrom(Tables.MOTD)
                .where(Tables.MOTD.ID.equal(idMotd))
                .fetchOne();
        }
        
        LOG.info("Returning a motd record.");
        return record;
    }
    
    /**
     * List all MOTD records
     * 
     * @return a list of MotdRecords or null if there are no records
     */
    @Override
    public List <MotdRecord> get() {
        
        List <MotdRecord> records = create
                .selectFrom(Tables.MOTD)
                .fetch();

        return records;
    }
    
    /**
     * Mark a record as deleted
     * 
     * @param idMotd
     * @return True if the action was successful, otherwise false
     */
    @Override
    public Boolean delete(Long idMotd) {
        return true;
    }

    @Override
    public Boolean disable(Long idMotdRecoord) {
        return true;
    }

    @Override
    public Boolean enable(Long idMotdRecord) {
        return true;
    }

    @Override
    public Boolean update(MotdRecord record) {
        return true;
    }
}
