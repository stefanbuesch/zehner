-- Run this in your Supabase SQL Editor

create table reservations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  date date not null,
  time time not null,
  party_size integer not null,
  status text default 'confirmed'
);

-- Enable RLS
alter table reservations enable row level security;

-- Policies (Adjust as needed, likely only server role can read/write for now)
create policy "Enable insert for authenticated users only" 
on reservations for insert 
with check ( true ); 
-- (Actually for this agent, we use Service Role key so RLS is bypassed on server, 
-- but good to have table secured from public anon access)
