const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools')
const Companies = require('../model/Company')

mongoose.connect('mongodb://localhost:27017/startup_db');

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function() {
    console.log('MongoDB connected.')
})

const prepare = (o) => {
    o._id = o._id.toString()
    return o
  }

const typeDefs = [`
    type Query {
        getCompanies: [Companies]
        getCompany(_id: ID): Companies
    }
    type Companies {
        _id: ID
        name: String
        abn: String
        description: String
        phone: String
        location: String
        category: String
        subcategory: String
    }
    type Mutation {
        createCompany(
            name: String
            abn: String
            description: String
            phone: String
            location: String
            category: String
            subcategory: String
        ): Companies
    }
    schema {
        query: Query
        mutation: Mutation
    }
`];

const resolvers = {
    Query: {
        getCompanies() {
            return Companies.find({})
        },
        getCompany(_, args) {
            return Companies.findOne({ _id: args._id });
        }
    },
    Mutation: {
        createCompany(_, args) {
            const comp = new Companies(args)
            return new Promise((resolve, object) => {
                comp.save((err) => {
                    if (err) {
                        reject(err)
                    } else { 
                        resolve(comp)
                    }
                })
            })
        }
    },
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema
