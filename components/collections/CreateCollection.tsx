import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { CREATE_COLLECTION } from '../../queries';
import { Input } from '../../hooks/useInput';
import useModalStore from '../../hooks/useModalStore';
import { Mutation } from '../../types/types';
import useStore from '../../context';
import { toast } from 'react-toastify';

type CreateCollectionInputs = {
    name: string;
};

function CreateCollection(props: any): JSX.Element {
    const { register, handleSubmit, errors } = useForm<CreateCollectionInputs>();
    const close = useModalStore((s) => s.controls.close);
    const [loading, setLoading] = useState(false);
    const setUserCollections = useStore((state) => state.setUserCollections);
    const collections = useStore((state) => state.collections);

    const [createCollection] = useMutation<Mutation>(CREATE_COLLECTION);

    async function submitContact(formValues: CreateCollectionInputs, e: any) {
        try {
            setLoading(true);
            const { data } = await createCollection({
                variables: { name: formValues.name },
            });
            setLoading(false);
            const newCollection = data.createCollectionForUser;
            setUserCollections([...collections, newCollection]);
            close();
        } catch (error) {
            setLoading(false);
            toast.error('There has been an error creating the collection...');
        }
    }

    return (
        <div className="column">
            <h2>Create a collection</h2>
            <p>
                With collections you're able to organize your Keycapsets. In the near future you're even able to share your collections for
                e.g. show off or sale purposes!
            </p>
            <br />
            <form onSubmit={handleSubmit(submitContact)} className="contact-form">
                <Input
                    id="name"
                    label="Collection name"
                    placeholder="E.g. For sale or Monotone color sets"
                    reference={register({ required: `Collection need a name.` })}
                    className={errors.name ? 'invalid' : ''}
                    errorMessage={errors.name && (errors.name.message as string)}
                    autoFocus={true}
                    maxLength={27}
                />

                <div className="controls flex v-center">
                    <button className="btn secondary md" onClick={close}>
                        Cancel
                    </button>
                    <button className="btn primary md" type="submit">
                        {loading ? 'Loading...' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
}

CreateCollection.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default CreateCollection;
