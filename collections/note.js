/**
 * Created by hastings on 7/03/2017.
 */
import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    Meteor.publish('users.notes', function () {
        return Notes.find({});
    });

    Meteor.methods({
        'users.add.notes'(userId, page){
            let notes = Notes.find({userId: userId});
            if (!notes.count()) {
                let noteId = new Mongo.ObjectID()._str;
                Notes.insert({
                    _id: noteId,
                    userId: userId,
                    pages: page ? [page] : []
                });
                return noteId;
            } else {
                let note = notes.fetch()[0];
                let pages = note.pages;
                pages.push(page);
                Notes.update({
                    _id: note._id
                }, {
                    $set: {
                        pages: pages
                    }
                });
                return node._id;
            }

        },
        'users.update.notes'(noteId, pages){
            Notes.update({
                _id: noteId
            }, {
                $set: {
                    pages: pages
                }
            });
        }
    });
}


export const Schema = {};
Schema.NoteSchema = new SimpleSchema({
    userId: {
        type: String,
        label: "user identity"
    },
    pages: {
        type: Array,
        label: "pages array"
    },
    "pages.$": {
        type: Object,
        label: "page object"
    },
    "pages.$.cueColumn": {
        type: String,
        label: "content of cue column",
        defaultValue: ""
    },
    "pages.$.noteContent": {
        type: String,
        label: "content of note",
        defaultValue: ""
    },
    "pages.$.summary": {
        type: String,
        label: "content of summary",
        defaultValue: ""
    },
    "pages.$.title": {
        type: String,
        label: "page title",
        defaultValue: ""
    }
});
