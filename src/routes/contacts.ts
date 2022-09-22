import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import { check, validationResult } from 'express-validator';
import Contact, { IContactField } from '../models/Contact';

const router = express.Router();

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({ user: req.user!.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Passed
    const { name, email, phone, type }: IContactField = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user!.id as mongoose.Schema.Types.ObjectId,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/contacts
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type }: IContactField = req.body;
  // Build contact object
  const contactFields: IContactField = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Make sure user owns contact
    if (contact.user!.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/contacts
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Make sure user owns contact
    if (contact.user!.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send('Server Error');
  }
});

export { router as contactsRouter };
