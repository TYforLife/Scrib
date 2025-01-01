import { useState, useEffect } from 'react';
import './Setting.css'

const Setting = () => {
  const [settings, setSettings] = useState({
    color: '',
    fontSize: 14,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const fileSettings = await window.electron.readJsonSetting()
        const color = fileSettings.color || ''
        // const windowSize = fileSettings.windowSize
        const fontSize = fileSettings.fontSize ?? 14
        setSettings({ color, fontSize });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleSave = () => {
    window.electron.writeJsonSetting('color', settings.color);
    // window.electron.setSetting('windowSize', settings.windowSize);
    window.electron.writeJsonSetting('fontSize', settings.fontSize.toString());
  };

  interface Settings {
    color: string;
    fontSize: number;
  }

  const handleChange = (key: keyof Settings, value: string | number) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value
    }));
  };

  return (
    <div id='settingWorld'>
      <h2>Settings</h2>
      <div>
        <label>Color:</label>
        <input
          type="color"
          value={settings.color}
          onChange={(e) => handleChange('color', e.target.value)}
        />
      </div>
      {/* <div>
        <label>Window Width:</label>
        <input
          type="number"
          value={settings.windowSize.width}
          onChange={(e) =>
            handleChange('windowSize', {
              ...settings.windowSize,
              width: e.target.value
            })
          }
        />
        <label>Window Height:</label>
        <input
          type="number"
          value={settings.windowSize.height}
          onChange={(e) =>
            handleChange('windowSize', {
              ...settings.windowSize,
              height: e.target.value
            })
          }
        />
      </div> */}
      <div>
        <label>Font Size:</label>
        <input
          type="number"
          value={settings.fontSize}
          onChange={(e) => handleChange('fontSize', e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Setting;