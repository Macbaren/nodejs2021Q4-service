create TABLE usr(
  id SERIAL PRIMARY KEY,
  nm VARCHAR(255),
  srn VARCHAR(255)
);

create TABLE board(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  columns VARCHAR(255)
);


