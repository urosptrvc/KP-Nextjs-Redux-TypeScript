import Head from "next/head";

export default function Header(props: {title: string}) {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="Lista oglasa"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
    )
}