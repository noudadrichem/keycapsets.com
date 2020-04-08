import React, { useContext } from "react";
import Button from "../Button";
import Context from "../../context";

interface TabProps {
    id: String;
    type: "cap" | "availability";
}

function Tab(props: TabProps): JSX.Element {
    const { id, type } = props;
    const state = useContext(Context);
    const isActive = id === state.activeTab || id === state.availabilityFilter;
    return (
        <li className="tab">
            <Button
                onClick={() =>
                    type === "cap"
                        ? isActive
                            ? state.setGlobalState({ activeTab: "all" })
                            : state.setGlobalState({ activeTab: id })
                        : isActive
                        ? state.setGlobalState({
                              availabilityFilter: "none",
                          })
                        : state.setGlobalState({
                              availabilityFilter: id,
                          })
                }
                variant="primary"
                size="sm"
                className={isActive ? "primary" : "inverted"}
            >
                {id}
            </Button>
        </li>
    );
}

export default Tab;
