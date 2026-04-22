import {
    type ValidVideoSourceType,
    type ValidContentListAutoLoadMoreType,
} from "@/types";

export const themeColorLight = "#ffffff";
export const themeColorDark = "#0f0f0f";

export const title = "FLY-DBH.com";
export const slogan = "假飞机驾驶员";

export const isUnderConstruction = false;

export const urlPrefixSanityImageCdn = `/sanity-images`;
// export const urlPrefixSanityImageCdn = `https://assets.fly-dbh.com/images`;
// export const urlPrefixSanityImageCdn = `http://127.0.0.1:8081/images`;

export const htmlAttributeImageViewer = "data-image-viewer";

export const defaultVideoSource: ValidVideoSourceType = "bilibili";
export const defaultContentListAutoLoadMore: ValidContentListAutoLoadMoreType =
    "1";

// ============================================================================
//
// #region 路由
//
// ============================================================================

export const routeBase = {
    home: "/",
};

// ============================================================================
//
// #region 缓存
// 详见 `@/src/services/_cache.ts`
//
// ============================================================================

export const defaultCacheTtl = 60 * 60_1000; // 1 hour
export const defaultCacheRefreshThreshold =
    defaultCacheTtl -
    (import.meta.env.DEV
        ? 5_000 // elapsed: 5 seconds
        : 5 * 60_000); // elapsed: 5 minutes

// #endregion
