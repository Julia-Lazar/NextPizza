import { http, HttpResponse } from 'msw'


const INGREDIENTS = [
    { id: 1, name: 'Tomato Sauce' },
    { id: 2, name: 'Mozzarella'},
]

export const handlers = [
    http.get('api/ingredients', () => {
        return HttpResponse.json(INGREDIENTS)
    }),
    http.get('api/ingredients/:id', (req) => {
        const { id } = req.params
        const ingredient = INGREDIENTS.find(ing => ing.id === Number(id))
        if (ingredient) {
            return HttpResponse.json(ingredient)
        } else {
            return HttpResponse.json({ error: 'Ingredient not found' }, { status: 404 })
        }
    }),
    http.post('api/ingredients', async ({ request }) => {
        const body = await request.json() as { name: string }
        const newId = INGREDIENTS.length ? INGREDIENTS[INGREDIENTS.length - 1].id + 1 : 1
        const newIngredient = { id: newId, name: body.name }
        INGREDIENTS.push(newIngredient)
        return HttpResponse.json(newIngredient, { status: 201 })
    }),
    http.put('api/ingredients/:id', async ({ params, request }) => {
        const { id } = params
        const body = await request.json()
        const index = INGREDIENTS.findIndex(ing => ing.id === Number(id))
        if (index !== -1) {
            if (body && typeof body === 'object' && !Array.isArray(body)) {
                INGREDIENTS[index] = { ...INGREDIENTS[index], ...body }
            }
            return HttpResponse.json(INGREDIENTS[index])
        } else {
            return HttpResponse.json({ error: 'Ingredient not found' }, { status: 404 })
        }
    }),
    http.delete('api/ingredients/:id', ({ params }) => {
        const { id } = params;
        const index = INGREDIENTS.findIndex(ing => ing.id === Number(id));
        if (index !== -1) {
            INGREDIENTS.splice(index, 1);
            return HttpResponse.json({ message: 'Ingredient deleted' }, { status: 200 });
        } else {
            return HttpResponse.json({ error: 'Ingredient not found' }, { status: 404 });
        }
    }),
]