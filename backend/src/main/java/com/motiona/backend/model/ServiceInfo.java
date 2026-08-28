package com.motiona.backend.model;

public class ServiceInfo {
    private String id;
    private String name;
    private String icon;
    private String description;
    private String badge;
    private String details;

    public ServiceInfo() {}

    public ServiceInfo(String id, String name, String icon, String description, String badge, String details) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.badge = badge;
        this.details = details;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
