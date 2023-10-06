
create table usuarios (
    id serial primary key,
    nome text,
    imagem text,
    username text not null unique,
    email text unique ,
    site text, 
    bio text,
    telefone text,
    genero text,
    senha text not null,
    verificado boolean default false
);

create table postagens (
    id serial primary key,
    usuario_id int not null,
    data timestamptz default now(),
    texto text,
    foreing key (usuario_id) references usuarios (id)
);

create table postagens_fotos (
    id serial primary key,
    postagem_id int not null,
    imagem text not null,
    foreing key (postagem_id) references postagens (id)
);

create table postagem_comentarios (
    id serial primary key,
    texto text not null,
    data timestamptz default now(),
    usuario_id int not null,
    postagem_id int not null,
    foreing key (postagem_id) references postagens (id),
    foreing key (usuario_id) references usuarios (id)
)

create table postagens_curtidas (
    usuario_id int not null,
    postagem_id int not null,
    data timestamptz default now(),
    foreing key (postagem_id) references postagens (id),
    foreing key (usuario_id) references usuarios (id)
)