import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'zh';

const translations = {
  // Header
  'product_overview': { en: 'Product Overview', zh: '产品概览' },
  'downloads': { en: 'Downloads', zh: '下载' },

  // Home
  'home_title': { en: 'Ride the Digital Phantom', zh: '驰骋于数字魅影' },
  'home_subtitle': { en: 'A stylish, secure, and powerful proxy service for the modern web.', zh: '为现代网络量身打造的时尚、安全、强大的代理服务。' },
  'download_macos': { en: 'Download for macOS', zh: '下载 macOS 版' },
  'see_other_platforms': { en: 'See other platforms', zh: '查看其他平台' },
  'app_screenshot_alt': { en: 'SCPROXY application screenshot', zh: 'SCPROXY 应用截图' },
  'app_video_alt': { en: 'SCPROXY product video', zh: 'SCPROXY 产品视频' },

  // Features
  'feature_speed_title': { en: 'Blazing Fast', zh: '极速稳定' },
  'feature_speed_desc': { en: 'Experience low-latency connections with our globally optimized network.', zh: '通过我们全球优化的网络，体验低延迟的连接。' },
  'feature_security_title': { en: 'Ironclad Security', zh: '坚如磐石' },
  'feature_security_desc': { en: 'Protect your data with industry-leading encryption and privacy standards.', zh: '使用行业领先的加密和隐私标准保护您的数据。' },
  'feature_servers_title': { en: 'Global Servers', zh: '全球节点' },
  'feature_servers_desc': { en: 'Access servers in dozens of countries to bypass geo-restrictions.', zh: '访问数十个国家/地区的服务器，轻松绕过地理限制。' },
  'feature_platforms_title': { en: 'Multi-Platform', zh: '多平台支持' },
  'feature_platforms_desc': { en: 'One account for all your devices, including desktop and mobile.', zh: '一个帐户即可在您的所有桌面和移动设备上使用。' },

  // Global Network
  'global_network_title': { en: 'Our Global Network', zh: '我们的全球网络' },
  'global_network_subtitle': { en: 'High-speed servers strategically located around the world ensure a reliable and fast connection, wherever you are.', zh: '遍布全球的战略性高速服务器可确保您在任何地方都能获得可靠、快速的连接。' },

  // Downloads page
  'download_center': { en: 'Download Center', zh: '下载中心' },
  'download_center_subtitle': { en: 'Choose your platform and get started in minutes.', zh: '选择您的平台，几分钟内即可开始使用。' },
  'desktop_apps': { en: 'Desktop Apps', zh: '桌面应用' },
  'mobile_apps': { en: 'Mobile Apps', zh: '移动应用' },
  'version': { en: 'Version:', zh: '版本：' },
  'released_on': { en: 'Released on:', zh: '发布于：' },
  'download_button': { en: 'Download', zh: '下载' },

  // OS descriptions
  'windows_desc': { en: 'Windows 10+ (x64)', zh: 'Windows 10+ (x64)' },
  'macos_desc': { en: 'macOS 11.0+ (Apple Silicon)', zh: 'macOS 11.0+ (Apple Silicon)' },
  'android_desc': { en: 'Android 8.0+', zh: 'Android 8.0+' },
  'ios_desc': { en: 'iOS 15.0+', zh: 'iOS 15.0+' },
  
  // Footer
  'copyright': { en: 'All rights reserved.', zh: '版权所有。' },
  'terms_of_service': { en: 'Terms of Service', zh: '服务条款' },
  'privacy_policy': { en: 'Privacy Policy', zh: '隐私政策' }
};

export type TranslationKey = keyof typeof translations;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  language = signal<Language>('zh');

  constructor() {
    this.loadLanguage();
  }

  loadLanguage() {
    const savedLang = localStorage.getItem('scpxy_lang') as Language;
    if (savedLang && ['en', 'zh'].includes(savedLang)) {
      this.language.set(savedLang);
    }
  }

  setLanguage(lang: Language) {
    this.language.set(lang);
    localStorage.setItem('scpxy_lang', lang);
  }

  t(key: TranslationKey) {
    return computed(() => translations[key][this.language()]);
  }
}
