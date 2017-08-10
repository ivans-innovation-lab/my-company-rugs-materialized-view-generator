package com.idugalic.queryside.myaggregate.repository;

import org.springframework.data.repository.NoRepositoryBean;

/**
 * A JPA repository interface.
 *
 */
@NoRepositoryBean
public interface MyAggregateRepository extends ReadOnlyPagingAndSortingRepository {
}
