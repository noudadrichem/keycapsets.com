import React from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';

import Heading from '../../../components/Heading';
import ButtonLink from '../../../components/ButtonLink';
import Meta from '../../../components/Meta';
import { initializeApollo } from '../../../hooks/withData';
import { GET_IC_BY_ID, GET_QUESTION_BY_ID } from '../../../queries';
import Button from '../../../components/Button';

interface InterestCheckQuestionProps {
    question: any;
    isLargeContainer: boolean;
    isNavShown: boolean;
    isFooterShown: boolean;
}

function InterestCheckQuestion(props: InterestCheckQuestionProps) {
    const { question } = props;

    console.log('QUESTION!!');
    // const router = useRouter();
    // console.log('router', router)

    // function startIc() {
    //     router.push({
    //         pathname: `${router.asPath}/question/${interestCheckQuestion.questions[0]._id}`,
    //     })
    // }

    return (
        <>
            <div className="question container">
                <Heading mainTitle="Question" subTitle="" left />

                {/* <Button
                    variant="primary"
                    size="lg"
                    onClick={startIc}
                >Start Interest check
                </Button> */}

                <pre>
                    <code>{JSON.stringify(question, null, 2)}</code>
                </pre>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const props: InterestCheckQuestionProps = {
        isLargeContainer: false,
        isNavShown: false,
        isFooterShown: false,
        question: null,
    };
    try {
        const client = initializeApollo();
        const { data, error } = await client.query({
            query: GET_QUESTION_BY_ID,
            variables: {
                id: context.query.id,
            },
        });

        console.log(data);

        if (error) {
            throw error;
        }

        props.question = data.questionById;
    } catch (err) {
        console.log('SSR props err', err);
    }

    return { props };
}

export default withGA('UA-115865530-2', Router)(InterestCheckQuestion);
