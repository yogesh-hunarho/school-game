import { create } from "zustand";
import { MeshStandardMaterial } from "three";
import { randInt } from "three/src/math/MathUtils.js";
import assetsData from "@/assets.json";

export const PHOTO_POSES = {
    Idle: "Idle",
    Chill: "Chill",
    Cool: "Cool",
    Punch: "Punch",
    Ninja: "Ninja",
    King: "King",
    Busy: "Busy",
};

export const UI_MODES = {
    PHOTO: "photo",
    CUSTOMIZE: "customize",
};

const assetImports = import.meta.glob("./assets/*", {
    query: "?url",
    import: "default",
    eager: true,
});

const getAssetUrl = (filename) => {
    const key = `./assets/${filename}`;
    return assetImports[key] || "";
};

export const useConfiguratorStore = create((set, get) => ({
    loading: true,
    mode: UI_MODES.CUSTOMIZE,
    setMode: (mode) => {
        set({ mode });
        if (mode === UI_MODES.CUSTOMIZE) {
            set({ pose: PHOTO_POSES.Idle });
        }
    },
    pose: PHOTO_POSES.Idle,
    setPose: (pose) => set({ pose }),
    categories: [],
    currentCategory: null,
    assets: [],
    lockedGroups: {},
    skin: new MeshStandardMaterial({ color: 0xf5c6a5, roughness: 1 }),
    customization: {},
    download: () => { },
    setDownload: (download) => set({ download }),
    screenshot: () => { },
    setScreenshot: (screenshot) => set({ screenshot }),
    updateColor: (color) => {
        set((state) => ({
            customization: {
                ...state.customization,
                [state.currentCategory.name]: {
                    ...state.customization[state.currentCategory.name],
                    color,
                },
            },
        }));
        if (get().currentCategory.name === "Head") {
            get().updateSkin(color);
        }
    },
    updateSkin: (color) => {
        get().skin.color.set(color);
    },
    fetchCategories: async () => {
        const categories = [];
        const allAssets = [];
        const customization = {};

        // Default colors for testing/logic, as they are missing in assets.json
        const defaultColors = [
            "#f5c6a5",
            "#e2a874",
            "#d49266",
            "#c47a54",
            "#aa5e3f",
            "#8a3f28",
            "#5e2a1b",
            "#3d1911",
            "#FCECD5",
            "#F2D8B9",
            "#E6C49D",
            "#D9B083",
        ];

        Object.entries(assetsData).forEach(([categoryName, categoryData], index) => {
            // Exclude animations from visual customization categories
            if (categoryName === "animations") return;

            const categoryId = categoryName; // Use name as ID for simplicity
            // Construct category object
            const category = {
                id: categoryId,
                name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1), // Capitalize
                removable: categoryName !== "head" && categoryName !== "body",
                colorPalette:
                    categoryName === "head" || categoryName === "body"
                        ? { colors: defaultColors }
                        : null,
                expand: {
                    colorPalette:
                        categoryName === "head" ? { colors: defaultColors } : null,
                },
            };

            // Fix for the specific "Head" check in existing updateColor logic which checks category.name === "Head"
            if (category.name === "Head") {
                category.expand = { colorPalette: { colors: defaultColors } };
            }

            const categoryAssets = categoryData.files.map((filename) => {
                // Use full filename (minus extension) or just filename as ID to ensure uniqueness
                const assetId = filename;
                const assetUrl = getAssetUrl(filename);
                const thumbnailUrl = categoryData.thumbnail
                    ? getAssetUrl(categoryData.thumbnail)
                    : "";

                const asset = {
                    id: assetId,
                    name: assetId,
                    group: categoryId,
                    thumbnail: categoryData.thumbnail,
                    thumbnailUrl,
                    url: filename,
                    fileUrl: assetUrl,
                };
                return asset;
            });

            category.assets = categoryAssets;
            allAssets.push(...categoryAssets);
            categories.push(category);

            // Set default customization
            customization[category.name] = {
                color: category.expand?.colorPalette?.colors?.[0] || "",
                asset: categoryAssets[0] || null,
            };
        });

        set({
            categories,
            currentCategory: categories[0],
            assets: allAssets,
            customization,
            loading: false,
        });
        get().applyLockedAssets();
    },
    setCurrentCategory: (category) => set({ currentCategory: category }),
    changeAsset: (category, asset) => {
        set((state) => ({
            customization: {
                ...state.customization,
                [category]: {
                    ...state.customization[category],
                    asset,
                },
            },
        }));
        get().applyLockedAssets();
    },
    randomize: () => {
        const customization = {};
        get().categories.forEach((category) => {
            let randomAsset = category.assets[randInt(0, category.assets.length - 1)];
            if (category.removable) {
                if (randInt(0, category.assets.length - 1) === 0) {
                    randomAsset = null;
                }
            }
            const randomColor =
                category.expand?.colorPalette?.colors?.[
                randInt(0, category.expand.colorPalette.colors.length - 1)
                ];
            customization[category.name] = {
                asset: randomAsset,
                color: randomColor,
            };
            if (category.name === "Head") {
                get().updateSkin(randomColor);
            }
        });
        set({ customization });
        get().applyLockedAssets();
    },

    applyLockedAssets: () => {
        // Current locked logic relies on asset.lockedGroups which is missing in assets.json
        const lockedGroups = {};
        set({ lockedGroups });
    },
}));

useConfiguratorStore.getState().fetchCategories();
