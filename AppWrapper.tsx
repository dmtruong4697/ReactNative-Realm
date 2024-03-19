import { AppProvider, RealmProvider, UserProvider, useApp } from "@realm/react"
import { Realm } from "realm";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import App from "./App";
import RealmWrapper from "./RealmWrapper";

function Login(): JSX.Element {
    const app = useApp();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const login = async () => {
            const credentials = Realm.Credentials.anonymous();
            await app.logIn(credentials);
            setIsLoggedIn(true);
        };

        login();
    }, [app]);

    return (
        <SafeAreaView style={{flex: 1}}> 
            {!isLoggedIn && <ActivityIndicator/>}
        </SafeAreaView>
    )
}

function AppWrapper(): JSX.Element {
    return (
        <AppProvider id={'application-0-laohp'}>
            <UserProvider fallback={<Login/>}>
                <RealmWrapper/>
            </UserProvider>
        </AppProvider>
    )
}

export default AppWrapper;