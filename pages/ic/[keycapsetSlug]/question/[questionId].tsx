import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';

import Heading from '../../../../components/Heading';
import ButtonLink from '../../../../components/ButtonLink';
import Meta from '../../../../components/Meta';
import { initializeApollo } from '../../../../hooks/withData';
import { GET_IC_BY_ID, GET_QUESTION_BY_ID } from '../../../../queries';
import Button from '../../../../components/Button';
import { useQuery } from '@apollo/client';
import useInterestCheckStore from '../../../../hooks/useInterestCheckStore';

interface InterestCheckQuestionProps {
    isLargeContainer: boolean;
    isNavShown: boolean;
    isFooterShown: boolean;
    questionId: string;
}

function InterestCheckQuestion(props: InterestCheckQuestionProps) {
    const { questionId } = props;
    const { data, loading } = useQuery(GET_QUESTION_BY_ID, {
        variables: {
            id: questionId,
        },
    });
    const nextQuestionId = useInterestCheckStore<any>((state) => state.nextQuestionId);

    useEffect(() => {
        if (data?.questionById) {
            console.log('has question now...');
        }
    }, [data]);

    function nextQuestion() {
        console.log('next question id...', nextQuestionId);
        // router.push({
        //     pathname: `${router.asPath}/question/${interestCheck.questions[0]._id}`,
        // });
    }

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        <>
            <div className="question container">
                <Heading mainTitle="Question" subTitle="" left />
                <pre>
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>

                <Button variant="secondary" onClick={nextQuestion}>
                    Next
                </Button>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const props: InterestCheckQuestionProps = {
        isLargeContainer: false,
        isNavShown: false,
        isFooterShown: false,
        questionId: context.query.questionId,
    };
    return { props };
}

export default withGA('UA-115865530-2', Router)(InterestCheckQuestion);
