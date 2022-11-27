const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "set name for contact"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    web: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      // required: [true, "set email for contact"],
    },
    comment: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    company: {
      type: String,
    },

    persons: {
      type: Array,
    },

    direction: {
      type: String,
    },
    position: {
      type: String,
    },
    tel: {
      type: String,
    },
    talkingRezult: {
      type: String,
    },
    callingDate: {
      type: String,
    },
    nextCallingDate: {
      type: String,
    },
    from: {
      type: String,
      // required:[true, "set FROM for contacts"],
    },
    priority: {
      type: Boolean,
    },
    licence: {
      type: Boolean,
    },
    features: {
      type: String,
      // required: false,
      set: (data) => (!data ? [] : data),
      get: (data) => DataTransfer.sort(),
    },
    //     submitDate: {
    //       type: Date,
    //       required:true,
    // },
  },
  {
    versionKey: false,
    timeStamp: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

contactSchema.path("name").validate((value) => {
  const result = /[A-Z,0-9]/;
  return (result.test = String(value));
});

// contactSchema.path("email").validate((value) => {
//   // const res = /[a-z,0-9,@,.]/;
//   const res = /a-z0-9/;
//   return (res.test = String(value));
// });
// contactSchema.path("comment").validate((value) => {
//   // const res = /[a-z,0-9,@,.]/;
//   const res = /a-z0-9/;
//   return (res.test = String(value));
// });
contactSchema.path("from").validate((value) => {
  // const res = /[a-z,0-9,@,.]/;
  const res = /a-z0-9/;
  return (res.test = String(value));
});
// contactSchema.path("firstName").validate((value) => {
//   const result = /[A-Za-z]/;
//   return (result.test = String(value));
// });

// contactSchema.path("lastName").validate((value) => {
//   const result = /[A-Za-z]/;
//   return (result.test = String(value));
// });

contactSchema.plugin(mongoosePaginate);
// contactSchema.virtual();
const Contact = model("contact", contactSchema);
module.exports = Contact;
