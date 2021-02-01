import { useMutation } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';

import useStore from '../../context';
import { SET_TO_COLLECTION } from '../../queries';
import { Collection, Want } from '../../types/types';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import { DirectoryPlus } from '../icons/DirectoryIcon';
import Popover from '../Popover';
import AddCollectionBtn from './AddCollectionBtn';

export interface CollectionHandlerProps {
    setId: string;
}

export default function CollectionHandler(props: CollectionHandlerProps): JSX.Element {
    const { setId } = props;
    const collections = useStore((state) => state.collections);
    const setUserCollections = useStore((state) => state.setUserCollections);
    const [addToCollection] = useMutation(SET_TO_COLLECTION);

    function addSetToCollection(collectionId: string, newWant: Want) {
        return collections.map((obj) => (obj._id === collectionId ? { ...obj, wants: [...obj.wants, newWant] } : obj));
    }

    function removeSetFromCollection(collectionId: string, setId: string) {
        // return collections.filter((obj) => obj._id !== collectionId)
    }

    async function handleCollectionClick(collection: Collection) {
        try {
            const response = await addToCollection({
                variables: {
                    setId,
                    collectionId: collection._id,
                },
            });

            console.log('add to collection...' + collection._id, response.data);
            const newCollections = addSetToCollection(collection._id, response.data.addSetToCollection);
            console.log('newCollections', newCollections);
            setUserCollections(newCollections);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    }

    const collectionSets = collections.map((collection) => ({
        id: collection._id,
        sets: collection.wants.map(({ set }) => set._id),
    }));

    const getIsInCollection = (collectionId: string) => (collectionSets as any).find(({ id }) => collectionId === id).sets.includes(setId);

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
                <AddCollectionBtn className="item small" />
            </Popover>
        </div>
    );
}
