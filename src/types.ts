// export type LocaleType = "en" | "ja" | "zh";

// export type ReactComponentPropsWitchLocale<L = Record<string, string>> = {
//     _: L;
//     currentLocale: LocaleType;
// };
export type ValueOf<T> = T[keyof T];

// ============================================================================

export type SiteConfigsType = {
    key: string;
    value: string;
}[];

/** https://ogp.me/#types */
export type ValidPageContentType = "video-player" | "article" | "profile";
export type ValidVideoSourceType = "bilibili" | "youtube" | "douyin";
export type ValidColorSchemeType = "dark" | "light";
export type ValidContentListAutoLoadMoreType = "0" | "1";
export type ValidVideoItemShowPlatformLinksOnHoverType = "0" | "1";
