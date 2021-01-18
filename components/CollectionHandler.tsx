import { useMutation } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';
import useStore from '../context';
import { SET_TO_COLLECTION } from '../queries';
import { Collection } from '../types/types';
import CheckmarkIcon from './icons/CheckmarkIcon';
import { DirectoryPlus } from './icons/DirectoryIcon';
import Plus from './PlusIcon';
import Popover from './Popover';

export interface CollectionHandlerProps {
    setId: string;
}

export default function CollectionHandler(props: CollectionHandlerProps): JSX.Element {
    const { setId } = props;
    const collections = useStore((state) => state.collections);
    const setBanner = useStore((state) => state.setBanner);

    const [addToCollection] = useMutation(SET_TO_COLLECTION);

    async function handleCollectionClick(collection: Collection) {
        console.log(collection);
        try {
            const response = await addToCollection({
                variables: {
                    setId,
                    collectionId: collection._id,
                },
            });
            console.log('add to collection...', response);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    }

    async function showAddCollection() {
        console.log('show add collection...');
    }

    const collectionSets = collections.map((collection) => ({
        id: collection._id,
        sets: collection.wants.map(({ set }) => set._id),
    }));
    const getIsInCollection = (collectionId: string) =>
        (collectionSets as any).find(({ id }) => collectionId === id).sets.includes(setId);

    return (
        <div className="collection-handler">
            <Popover clickTarget={<DirectoryPlus />}>
                {collections
                    .filter((collection) => collection.name !== 'Likes')
                    .map((collection, idx) => {
                        const isInCollection = getIsInCollection(collection._id);

                        return (
                            <span className={`item`} key={idx} onClick={() => handleCollectionClick(collection)}>
                                {isInCollection && <CheckmarkIcon size={14} color="#364154" />}
                                {collection.name}
                            </span>
                        );
                    })}
                <span className={`item small`} onClick={() => showAddCollection()}>
                    <Plus size={11} color="#364154" rotation={45} />
                    Add collection
                </span>
            </Popover>
        </div>
    );
}
