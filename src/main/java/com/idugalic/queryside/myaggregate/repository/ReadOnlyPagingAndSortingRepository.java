package com.idugalic.queryside.myaggregate.repository;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.idugalic.queryside.myaggregate.domain.MyAggregate;

/**
 * A read only repository interface - save and delete operations will not be exported as a resource
 *
 */
@NoRepositoryBean
public interface ReadOnlyPagingAndSortingRepository extends PagingAndSortingRepository<MyAggregate, String> {

    @Override
    @SuppressWarnings("unchecked")
    @RestResource(exported = false)
    MyAggregate save(MyAggregate entity);

    @Override
    @RestResource(exported = false)
    void delete(String aLong);

    @Override
    @RestResource(exported = false)
    void delete(MyAggregate entity);
}
