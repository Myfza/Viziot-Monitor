/*
  # Create devices table for IoT dashboard

  1. New Tables
    - `devices`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text, device name)
      - `type` (text, device type like 'led', 'motor', etc.)
      - `status` (boolean, ON/OFF state)
      - `pin` (integer, GPIO pin number, optional)
      - `description` (text, device description, optional)
      - `last_updated` (timestamptz, when status was last changed)
      - `created_at` (timestamptz, when device was added)

  2. Security
    - Enable RLS on `devices` table
    - Add policy for users to manage their own devices only
    - Users can read, insert, update, and delete their own devices
*/

-- Create the devices table
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text DEFAULT 'led' NOT NULL,
  status boolean DEFAULT false NOT NULL,
  pin integer,
  description text,
  last_updated timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own devices"
  ON devices
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devices"
  ON devices
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices"
  ON devices
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices"
  ON devices
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS devices_user_id_idx ON devices(user_id);
CREATE INDEX IF NOT EXISTS devices_created_at_idx ON devices(created_at);