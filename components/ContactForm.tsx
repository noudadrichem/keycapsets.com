import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../hooks/useInput';
import useModalStore from '../hooks/useModalStore';
import user from '../pages/user';
import TextArea from './TextArea';

interface ContactFormProps {}

type ContactKCSInputs = {
    name: string;
    email: string;
    text: string;
};

function ContactForm(): JSX.Element {
    const { register, handleSubmit, errors, control, reset } = useForm<ContactKCSInputs>();
    const close = useModalStore((s) => s.controls.close);
    const [loading, setLoading] = useState(false);

    async function submitContact(formValues: ContactKCSInputs, e: any) {
        setLoading(true);
        const body = {
            ...formValues,
            source: 'PROMOTE_YOUR_SET',
        };
        try {
            const URL = 'https://api.keycapsets.com/contact-kcs';
            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            setLoading(false);
            e.target.reset();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <div className="column">
            <h2>Contact</h2>
            <br />
            <form onSubmit={handleSubmit(submitContact)} className="contact-form">
                <Input
                    id="name"
                    label="Full name"
                    reference={register({ required: `I'd like to know your name.` })}
                    className={errors.name ? 'invalid' : ''}
                    errorMessage={errors.name && (errors.name.message as string)}
                />

                <Input
                    id="email"
                    label="Email address"
                    reference={register({
                        required: 'Email address is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Email address is invalid',
                        },
                    })}
                    defaultValue={user.email}
                    className={errors.email ? 'invalid' : ''}
                    errorMessage={errors.email && (errors.email.message as string)}
                />

                <Controller
                    as={TextArea}
                    control={control}
                    id="text"
                    name="text"
                    label="Message"
                    reference={register({ required: 'Let me know where you want to talk about!' })}
                    errorMessage={errors.text && (errors.text.message as string)}
                />

                <div className="controls flex v-center">
                    <button className="btn secondary md" onClick={close}>
                        Cancel
                    </button>
                    <button className="btn primary md" type="submit">
                        {loading ? 'Loading...' : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
}

ContactForm.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default ContactForm;
