import React, { useContext } from 'react';
import { InititalState, Brand, Profile, Material, Context } from 'typings';
import { AVAILABILITY_FILTER } from '../../constants';
import context from '../../context';
import MultiSelect from '../Multiselect';
import Select from '../Select';
import Tab from './Tab';

interface TabsProps {}

function Tabs(props: TabsProps): JSX.Element {
    const {} = props;
    const { state, dispatch } = useContext<Context>(context);

    // function resetFilter() {
    //     context.setGlobalState({
    //         filters: {
    //             ...context.filters,
    //             availabilityFilter: 'none',
    //             brandFilter: [],
    //         },
    //     });
    // }

    // // TODO: This needs refactoring...
    // function handleBrandFilter(values: Brand[]) {
    //     context.setGlobalState({
    //         filters: {
    //             ...context.filters,
    //             brandFilter: values.map((b: Brand) => b.value),
    //         },
    //     });
    // }

    // function handleProfileFilter(values: Profile[]) {
    //     context.setGlobalState({
    //         filters: {
    //             ...context.filters,
    //             profileFilter: values.map((b: Profile) => b.value),
    //         },
    //     });
    // }

    // function handleMaterialFilter(values: Material[]) {
    //     context.setGlobalState({
    //         filters: {
    //             ...context.filters,
    //             materialFilter: values.map((b: Material) => b.value),
    //         },
    //     });
    // }
    return null;
    // return (
    //     <>
    //         <div className="filters">
    //             <div className="left-side">
    //                 <div className="filter availability desktop-only">
    //                     <label className="label">Availability</label>
    //                     <div className="tabs">
    //                         {context.availability.map((tab: String, idx: number) => (
    //                             <Tab type={AVAILABILITY_FILTER} id={tab} key={idx} />
    //                         ))}
    //                         <div>
    //                             {context.filters.availabilityFilter !== 'none' && (
    //                                 <p className="small light clickable" onClick={resetFilter}>
    //                                     reset
    //                                 </p>
    //                             )}
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="filter availability mobile-only">
    //                     <Select
    //                         label="Availability"
    //                         name="Choose availability"
    //                         onSelectChange={(selectedFilterValue) =>
    //                             context.setGlobalState({
    //                                 filters: {
    //                                     ...context.filters,
    //                                     availabilityFilter: selectedFilterValue,
    //                                 },
    //                             })
    //                         }
    //                         values={context.availability.map((t) => ({
    //                             id: t,
    //                             name: t,
    //                         }))}
    //                     />
    //                 </div>

    //                 <div className="filter brand">
    //                     <MultiSelect isMulti label="Brand" options={context.brands} onChange={handleBrandFilter} />
    //                 </div>

    //                 <div className="filter profile">
    //                     <MultiSelect
    //                         isMulti
    //                         label="Profile"
    //                         options={context.profiles}
    //                         onChange={handleProfileFilter}
    //                     />
    //                 </div>

    //                 <div className="filter material">
    //                     <MultiSelect
    //                         isMulti
    //                         label="Material"
    //                         options={context.materials}
    //                         onChange={handleMaterialFilter}
    //                     />
    //                 </div>
    //             </div>

    //             <div className="counter">
    //                 <label className="label">Keycapsets:</label>
    //                 <p className="light">{context.allKeycapsetsCount}</p>
    //             </div>
    //         </div>
    //     </>
    // );
}

export default Tabs;
