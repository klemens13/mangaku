import { AppSettings, getDownloads, removeDownload } from '../utils/storage';

interface Props {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export default function Settings({ settings, onSettingsChange }: Props) {
  const downloads = getDownloads();

  const handleClearDownloads = () => {
    if (confirm('Hapus semua data download?')) {
      downloads.forEach(d => {
        removeDownload(d.mangaId, d.chapterId);
      });
      window.location.reload();
    }
  };

  const handleClearProgress = () => {
    if (confirm('Hapus semua riwayat baca?')) {
      localStorage.removeItem('mangaku_progress');
      window.location.reload();
    }
  };

  return (
    <div className="px-4 pt-4">
      <h1 className="text-2xl font-bold text-white mb-1">Pengaturan</h1>
      <p className="text-sm text-gray-400 mb-6">Kustomisasi pengalaman baca</p>

      {/* Reading Mode */}
      <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800 mb-4">
        <h3 className="text-white font-medium mb-3">Mode Baca</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSettingsChange({ ...settings, readingMode: 'vertical' })}
            className={`p-3 rounded-xl border text-center transition-all ${
              settings.readingMode === 'vertical'
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-gray-700 bg-[#0f0f23]'
            }`}
          >
            <span className="text-2xl block mb-1">📜</span>
            <span className="text-xs text-gray-300">Scroll Vertikal</span>
          </button>
          <button
            onClick={() => onSettingsChange({ ...settings, readingMode: 'horizontal' })}
            className={`p-3 rounded-xl border text-center transition-all ${
              settings.readingMode === 'horizontal'
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-gray-700 bg-[#0f0f23]'
            }`}
          >
            <span className="text-2xl block mb-1">📖</span>
            <span className="text-xs text-gray-300">Halaman per Halaman</span>
          </button>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800 mb-4">
        <h3 className="text-white font-medium mb-3">Tampilan</h3>
        
        <div className="space-y-4">
          {/* Show Page Number */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Tampilkan Nomor Halaman</span>
            <button
              onClick={() => onSettingsChange({ ...settings, showPageNumber: !settings.showPageNumber })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.showPageNumber ? 'bg-purple-600' : 'bg-gray-700'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                settings.showPageNumber ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Brightness */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Kecerahan</span>
              <span className="text-xs text-gray-500">{settings.brightness}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              value={settings.brightness}
              onChange={(e) => onSettingsChange({ ...settings, brightness: Number(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Download Management */}
      <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800 mb-4">
        <h3 className="text-white font-medium mb-3">Data & Penyimpanan</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Chapter Terdownload</p>
              <p className="text-xs text-gray-500">{downloads.length} chapter</p>
            </div>
            <button
              onClick={handleClearDownloads}
              className="px-3 py-1.5 bg-red-900/30 border border-red-800 rounded-lg text-xs text-red-400"
            >
              Hapus Semua
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Riwayat Baca</p>
              <p className="text-xs text-gray-500">Progress semua manga</p>
            </div>
            <button
              onClick={handleClearProgress}
              className="px-3 py-1.5 bg-red-900/30 border border-red-800 rounded-lg text-xs text-red-400"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800 mb-4">
        <h3 className="text-white font-medium mb-3">Tentang Aplikasi</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Versi</span>
            <span className="text-sm text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Min. Android</span>
            <span className="text-sm text-white">Android 6.0+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Tipe</span>
            <span className="text-sm text-white">Progressive Web App</span>
          </div>
        </div>
      </div>

      {/* Install PWA */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-4 border border-purple-800/30 mb-8">
        <h3 className="text-white font-medium mb-2">📱 Install Aplikasi</h3>
        <p className="text-xs text-gray-400 mb-3">
          Pasang MangaKu di home screen untuk akses cepat. Buka menu browser → "Add to Home Screen"
        </p>
        <div className="text-xs text-gray-500">
          <p>• Chrome: Menu ⋮ → "Install app" atau "Add to Home screen"</p>
          <p>• Samsung Internet: Menu → "Add page to" → "Home screen"</p>
        </div>
      </div>
    </div>
  );
}
