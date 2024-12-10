import { NextResponse } from "next/server";
import { getPersonByPhoneNumber, addPerson } from "@back-end/models/person.js";

export async function handleGetPersonByPhoneNumber(phone_number) {
  try {
    const person = await getPersonByPhoneNumber(phone_number);
    if (person.length === 0) {
      return NextResponse.json({ person: null, ok: true }, { status: 200 });
    }
    return NextResponse.json({ person, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleAddPerson(name, phone_number, city, district) {
  try {
    const person = await addPerson(name, phone_number, city, district);
    if (!person) {
      return NextResponse.json({ message: "Failed to add person", ok: false }, { status: 400 });
    }
    console.log(person);
    return NextResponse.json({ person, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}