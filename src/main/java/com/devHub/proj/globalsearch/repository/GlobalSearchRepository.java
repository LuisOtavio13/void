package com.devHub.proj.globalsearch.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devHub.proj.globalsearch.dto.GlobalSearchResultDTO;
import com.devHub.proj.globalsearch.model.GlobalSearchEntity;


@Repository
public interface GlobalSearchRepository extends JpaRepository<GlobalSearchEntity, Long> {

    @Query(value = """
        SELECT source_table as sourceTable, 
               record_id as recordId, 
               similarity(cast(search_vector as text), :termo) as rank
        FROM global_search
        WHERE cast(search_vector as text) % :termo
           OR cast(search_vector as text) ILIKE CONCAT('%', :termo, '%')
        ORDER BY rank DESC
        """, nativeQuery = true)
    List<GlobalSearchResultDTO> findAll(@Param("termo") String termo);
    
}
