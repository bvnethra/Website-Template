package com.motiona.backend.model;

public class StatsInfo {
    private String label;
    private int count;
    private String suffix;

    public StatsInfo() {}

    public StatsInfo(String label, int count, String suffix) {
        this.label = label;
        this.count = count;
        this.suffix = suffix;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }

    public String getSuffix() { return suffix; }
    public void setSuffix(String suffix) { this.suffix = suffix; }
}
