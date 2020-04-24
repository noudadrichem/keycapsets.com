// import { useState, createContext } from 'react';
// import { InititalState, Keycapset } from 'typings';
// import moment from 'moment';

// export const INITITAL_STATE: any = {
//     filters: {
//         availabilityFilter: 'none',
//         brandFilter: [],
//         profileFilter: [],
//         materialFilter: [],
//     },
//     // availability: AVAILABILITY,
//     // brands: BRAND_OPTIONS,
//     // profiles: PROFILE_OPTIONS,
//     // materials: MATERIAL_OPTIONS,
//     keycapsets: [],
//     filteredSets: [],
//     searchQuery: '',
//     allKeycapsetsCount: 0,
//     setGlobalState: () => { },
// };

// export const Context = createContext(INITITAL_STATE);

// function useGlobalState() {
//     const [state, setState] = useState<InititalState>(INITITAL_STATE);

//     function reduceState(obj: InititalState): InititalState {
//         const reducedState = {
//             ...state,
//             ...obj,
//         };
//         // if (process.env.NODE_ENV === 'development') {
//         //     console.log(moment().format('hh:mm:ss') + '_STATE...', reducedState);
//         // }
//         return {
//             ...reducedState,
//             // filteredSets: reducedState.keycapsets.filter((set: Keycapset) => handleFilters(set, reducedState.filters)),
//         };
//     }

//     function setGlobalState(obj: any) {
//         setState(reduceState(obj));

//         console.log('set global...', state)
//     }

//     return { state, setGlobalState };
// }

// export default useGlobalState;
