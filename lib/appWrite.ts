import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Storage,
    Query
} from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '67a0c2ed002eef6dccc7',
    databaseId: '67a0c77200257a07ae4f',
    usersCollectionId: '67a0c806000c38bfaf50',
    videosCollectionId: '67a0c8340028e3fd3d0c',
    storageId: '67a0c9cd00007d8576d7',
}

let client: Client;
client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({ email, password, username }: { email: string, password: string, username: string; }) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw new Error("User creation failed");

        // Generate user avatar
        const avatarUrl = avatars.getInitials(username);

        await SignIn({ email, password });

        const newUser = await database.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            },
            [
                'role:member', // Add necessary permissions
                'role:guests'
            ]
        )

        return newUser;
    } catch (error: any) {
        console.error("Error creating user:", error.message);
        throw new Error(error.message);
    }
};

export async function SignIn({ email, password }: { email: string, password: string }) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        console.error("Error signing in:", error.message);
        throw new Error(error.message);
    }
}
// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw new Error("No current account found");

        const currentUser = await database.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser || currentUser.documents.length === 0) throw new Error("No user found for the current account");

        return currentUser.documents[0];
    } catch (error: any) {
        console.error("Error getting current user:", error.message);
        return null;
    }
}
