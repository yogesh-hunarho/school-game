// const STORAGE_KEY = 'lms_walkthroughs_v1';

// export const WalkthroughStorage = {
//     getAll() {
//         try {
//             return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
//         } catch {
//             return {};
//         }
//     },

//     has(id) {
//         const data = this.getAll();
//         return Boolean(data[id]);
//     },

//     mark(id) {
//         const data = this.getAll();
//         data[id] = {
//             completed: true,
//             timestamp: Date.now()
//         };
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//     },

//     reset(id) {
//         const data = this.getAll();
//         delete data[id];
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//     },

//     clearAll() {
//         localStorage.removeItem(STORAGE_KEY);
//     }
// };


const STORAGE_KEY = 'lms_walkthroughs_v1';

const keyFor = (id, mode) => `${mode}:${id}`;

export const WalkthroughStorage = {
    has(id, mode = 'auto') {
        const data = this.getAll();
        return Boolean(data[keyFor(id, mode)]);
    },

    mark(id, mode = 'auto') {
        const data = this.getAll();
        data[keyFor(id, mode)] = {
            completed: true,
            timestamp: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    getAll() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    },

    reset(id, mode) {
        const data = this.getAll();
        if (mode) {
            delete data[keyFor(id, mode)];
        } else {
            // reset both auto + manual
            delete data[keyFor(id, 'auto')];
            delete data[keyFor(id, 'manual')];
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};
