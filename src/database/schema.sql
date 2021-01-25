CREATE DATABASE cooking;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS chefs (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  resume text NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  recipes text[]
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  name text,
  path text NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  ingredients text[] NOT NULL,
  preparation text[] NOT NULL,
  information text,
  category_id UUID,
  chef_id UUID,
  tag_id text[],
  FOREIGN KEY(category_id) REFERENCES categories(id),
  FOREIGN KEY(chef_id) REFERENCES chefs(id)
);
