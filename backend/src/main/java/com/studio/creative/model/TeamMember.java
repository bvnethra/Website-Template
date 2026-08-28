package com.studio.creative.model;

public class TeamMember {
    private String id;
    private String name;
    private String role;
    private String bio;
    private String avatarUrl;

    public TeamMember() {}

    public TeamMember(String id, String name, String role, String bio, String avatarUrl) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
