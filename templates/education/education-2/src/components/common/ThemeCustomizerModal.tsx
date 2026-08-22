import React, { useState } from 'react';
import { X, Sliders, Check, RotateCcw, Download, Sparkles, Building, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { themePresets, defaultUniversityConfig } from '../../config/templateConfig';

export const ThemeCustomizerModal: React.FC = () => {
  const { isCustomizerOpen, closeCustomizer, theme, setThemeById, config, updateConfig, addNotification } = useTheme();

  const [localName, setLocalName] = useState(config.name);
  const [localMotto, setLocalMotto] = useState(config.motto);
  const [localEstablished, setLocalEstablished] = useState(config.established.toString());

  if (!isCustomizerOpen) return null;

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      name: localName,
      shortName: localName.split(' ')[0],
      motto: localMotto,
      established: parseInt(localEstablished, 10) || 1884,
    });
    addNotification('success', 'Branding Updated', `University branding updated to "${localName}".`);
  };

  const handleReset = () => {
    setThemeById(themePresets[0].id);
    updateConfig(defaultUniversityConfig);
    setLocalName(defaultUniversityConfig.name);
    setLocalMotto(defaultUniversityConfig.motto);
    setLocalEstablished(defaultUniversityConfig.established.toString());
    addNotification('info', 'Reset to Defaults', 'Restored default Edunexa Oxford Navy preset.');
  };

  const handleExportConfig = () => {
    const exportData = {
      themePreset: theme,
      universityConfig: config,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edunexa-theme-${theme.id}.json`;
    a.click();
    addNotification('success', 'Config Exported', 'Downloaded theme configuration JSON.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ backgroundColor: theme.primary }} className="p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Collegiate White-Label Engine
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                Live Theme & Institutional Palette Switcher
              </h3>
            </div>
          </div>
          <button onClick={closeCustomizer} className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Preset Grid */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-700" />
              Select Institutional Color Preset:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {themePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setThemeById(preset.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    theme.id === preset.id
                      ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-1 ring-amber-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1 shrink-0">
                      <div
                        style={{ backgroundColor: preset.primary }}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-xs"
                      />
                      <div
                        style={{ backgroundColor: preset.accent }}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-xs"
                      />
                      <div
                        style={{ backgroundColor: preset.secondary }}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-xs"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-amber-800 transition-colors">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        {preset.subtitle}
                      </span>
                    </div>
                  </div>
                  {theme.id === preset.id && (
                    <div className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Live White-Label Branding Form */}
          <form onSubmit={handleSaveBranding} className="space-y-4 pt-4 border-t border-slate-200">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-700" />
              Customize University Identity & Seal:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">University Name</label>
                <input
                  type="text"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Established Year</label>
                <input
                  type="number"
                  value={localEstablished}
                  onChange={(e) => setLocalEstablished(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Latin Motto</label>
              <input
                type="text"
                value={localMotto}
                onChange={(e) => setLocalMotto(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-serif italic text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply Branding Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleExportConfig}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={closeCustomizer}
              style={{ backgroundColor: theme.primary }}
              className="px-5 py-2 rounded-xl text-white font-bold text-xs hover:opacity-95 shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
