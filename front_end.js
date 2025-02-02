import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GiftReminderApp() {
  const [reminders, setReminders] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [giftIdea, setGiftIdea] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/view_reminders")
      .then((response) => response.json())
      .then((data) => setReminders(data))
      .catch((error) => console.error("Error fetching reminders:", error));
  }, []);

  const handleAddReminder = async () => {
    const newReminder = { event_name: eventName, event_date: eventDate, gift_idea: giftIdea };
    
    const response = await fetch("http://127.0.0.1:5000/add_reminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReminder),
    });

    if (response.ok) {
      setReminders([...reminders, newReminder]);
      setEventName("");
      setEventDate("");
      setGiftIdea("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gift Reminder App</h1>
      <Card className="mb-4">
        <CardContent className="p-4">
          <Label>Event Name</Label>
          <Input value={eventName} onChange={(e) => setEventName(e.target.value)} className="mb-2" />
          <Label>Event Date</Label>
          <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="mb-2" />
          <Label>Gift Idea</Label>
          <Input value={giftIdea} onChange={(e) => setGiftIdea(e.target.value)} className="mb-2" />
          <Button onClick={handleAddReminder} className="mt-2">Add Reminder</Button>
        </CardContent>
      </Card>
      <h2 className="text-xl font-semibold mb-2">Upcoming Reminders</h2>
      {reminders.length > 0 ? (
        reminders.map((reminder, index) => (
          <Card key={index} className="mb-2">
            <CardContent className="p-4">
              <p><strong>Event:</strong> {reminder.event_name}</p>
              <p><strong>Date:</strong> {reminder.event_date}</p>
              <p><strong>Gift:</strong> {reminder.gift_idea}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No reminders yet.</p>
      )}
    </div>
  );
}
