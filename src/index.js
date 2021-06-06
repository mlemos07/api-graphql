const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        profession: String!
    }

    type Query {
        getUsers: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!, profession: String!): User!
    }
`;

const users = [
    { _id: String(Math.random()), name: 'Marianna', email: 'Marianna@hotmail.com', profession: 'Desenvolvedor back-end' },
    { _id: String(Math.random()), name: 'Mateus', email: 'Mateus@hotmail.com', profession: 'Desenvolvedor front-end' },
    { _id: String(Math.random()), name: 'Carlos', email: 'Carlos@hotmail.com', profession: 'Desenvolvedor mobile' },
]

const resolvers = {
    Query: {
        getUsers: () => users,
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email === args.email)
        }
    },

    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                profession: args.profession,
            };

            users.push(newUser)
            return newUser
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`🔥 Server started at ${url}`))