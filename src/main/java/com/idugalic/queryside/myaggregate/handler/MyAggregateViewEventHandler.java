package com.idugalic.queryside.myaggregate.handler;

import org.axonframework.config.ProcessingGroup;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.eventsourcing.SequenceNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.idugalic.common.blog.event.BlogPostCreatedEvent;
import com.idugalic.queryside.myaggregate.domain.MyAggregate;
import com.idugalic.queryside.myaggregate.repository.MyAggregateRepository;

/**
 * Event handlers
 *
 */
@ProcessingGroup("default")
@Component
public class MyAggregateViewEventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(MyAggregateViewEventHandler.class);

    @Autowired
    private MyAggregateRepository myAggregateRepository;

    @EventHandler
    public void handle(BlogPostCreatedEvent event, @SequenceNumber Long version) {
        LOG.info("MyAggregateCreatedEvent: [{}] ", event.getId());
        myAggregateRepository.save(new MyAggregate(event, version));
    }
}
