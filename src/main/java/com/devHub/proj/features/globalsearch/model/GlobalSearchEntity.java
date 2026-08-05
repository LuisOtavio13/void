package com.devHub.proj.features.globalsearch.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "global_search")
public class GlobalSearchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, insertable = false)
    private Long id;

    @Column(name = "source_table", nullable = false, length = 50)
    private String sourceTable;

    @Column(name = "record_id", nullable = false)
    private Long recordId;

    // Mapeamento seguro para o tsvector do Postgres [1]
    @Column(name = "search_vector", columnDefinition = "tsvector", insertable = false, updatable = false)
    private String searchVector;

    @Column(name = "update_date", nullable = false, insertable = false, updatable = false)
    private LocalDateTime updateDate;

    // 1. Construtor padrão exigido obrigatoriamente pelo JPA
    public GlobalSearchEntity() {
    }

    // 2. Construtor completo (opcional, útil para testes)
    public GlobalSearchEntity(Long id, String sourceTable, Long recordId, String searchVector, LocalDateTime updateDate) {
        this.id = id;
        this.sourceTable = sourceTable;
        this.recordId = recordId;
        this.searchVector = searchVector;
        this.updateDate = updateDate;
    }

    // 3. Métodos Getters e Setters Convencionais
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceTable() {
        return sourceTable;
    }

    public void setSourceTable(String sourceTable) {
        this.sourceTable = sourceTable;
    }

    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public String getSearchVector() {
        return searchVector;
    }

    public void setSearchVector(String searchVector) {
        this.searchVector = searchVector;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }
}
