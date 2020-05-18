import { useContext, useEffect } from 'react';

import { InititalState, Context, Keycapset } from 'typings';
import { context } from '../context';
import Button from './Button';
import { useMutation } from '@apollo/react-hooks';
import { CLAIM_SET } from '../queries';

interface ClaimSetProps {
    keycapset: Keycapset;
    callback?: Function;
}

function ClaimSet(props: ClaimSetProps): JSX.Element {
    const { keycapset, callback } = props;
    const { state } = useContext<Context>(context);
    const isLoggedInAndIsDesigner: boolean = state.isLoggedIn && state.user.isDesigner;
    const isYourSet: boolean = keycapset.designedBy.includes(state.user._id);
    const [addClaim, claimMutationResponse] = useMutation<any>(CLAIM_SET);

    useEffect(() => {
        if (claimMutationResponse.data) {
            if (claimMutationResponse.data.claimSet.message === 'Claimed set...') {
                // TODO refactor this in the API
                callback();
            }
        }
    }, [claimMutationResponse]);

    async function designerClaimSet(setId: string) {
        try {
            const response = await addClaim({ variables: { setId } });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {isLoggedInAndIsDesigner && (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => designerClaimSet(keycapset._id)}
                    isDisabled={isYourSet}
                >
                    {isYourSet ? 'You already claimed this set.' : 'Did you design this set? Claim it!'}
                </Button>
            )}
        </div>
    );
}

export default ClaimSet;
