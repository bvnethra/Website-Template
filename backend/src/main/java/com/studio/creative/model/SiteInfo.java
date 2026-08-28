package com.studio.creative.model;

import java.util.Map;

public class SiteInfo {
    private String name;
    private String tagline;
    private String description;
    private String email;
    private Map<String, String> socialLinks;

    public SiteInfo() {}

    public SiteInfo(String name, String tagline, String description, String email, Map<String, String> socialLinks) {
        this.name = name;
        this.tagline = tagline;
        this.description = description;
        this.email = email;
        this.socialLinks = socialLinks;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Map<String, String> getSocialLinks() { return socialLinks; }
    public void setSocialLinks(Map<String, String> socialLinks) { this.socialLinks = socialLinks; }
}
