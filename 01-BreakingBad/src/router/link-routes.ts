
export interface RouterLink {
    name :string;
    path :string;
    title:string;
}

export const routerLink:RouterLink[] = [
    {   name :'home',
        path :'/',
        title:'Inicio'
    },
    {   name :'about',
        path :'/about',
        title:'Sobre mi'
    },
    {   name :'characters',
        path :'/characters',
        title:'Personajes'
    },

]