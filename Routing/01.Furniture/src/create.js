import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { post } from "../api.js";
import page from '../../../../node_modules/page/page.mjs'

const createTemplate = () => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Create New Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onCreate}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class="form-control valid" id="new-make" type="text" name="make">
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class="form-control is-valid" id="new-model" type="text" name="model">
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class="form-control is-invalid" id="new-year" type="number" name="year">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class="form-control" id="new-description" type="text" name="description">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class="form-control" id="new-price" type="number" name="price">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class="form-control" id="new-image" type="text" name="img">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material">
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
    </div>
</div>
</form>
`
export async function showCreate() {
    render(createTemplate(), document.querySelector('div.container'))
}


async function onCreate(e) {
    e.preventDefault();
    const make = document.getElementById('new-make')
    const model = document.getElementById('new-model')
    const year = document.getElementById('new-year')
    const description = document.getElementById('new-description')
    const price = document.getElementById('new-price')
    const img = document.getElementById('new-image')
    const material = document.getElementById('new-material')

    try {
        if (make.value == '' || model.value == '' || year.value == '' || description.value == '' || price.value == '' || img.value == '') {
            throw new Error('All fields must be filled!')
        }
        if (make.value.length < 4 || model.value.length < 4) {
            make.classList.add('is-invalid')
            model.classList.add('is-invalid')
            throw new Error('Make and Model must be at elast 4 symbols long!')
        } else {
            make.classList.add('is-valid')
            model.classList.add('is-valid')
        }

        if (year.value < 1950 || year.value > 2050) {
            year.classList.add('is-invalid')
            throw new Error('Year must be between the parameters!')
        } else {
            year.classList.add('is-valid')
        }

        if (description.value.length <= 10) {
            description.classList.add('is-invalid')
            throw new Error('Description must be between at least 10 symbols long!')
        } else {
            description.classList.add('is-valid')
        }

        if (price.value <= 0) {
            price.classList.add('is-invalid')
            throw new Error('Price must be a possitive number')
        } else {
            price.classList.add('is-valid')
        }

        if (img.value == '') {
            img.classList.add('is-invalid')
            throw new Error('Img url must be filled!')
        } else {
            img.classList.add('is-valid')
        }

        material.classList.add('is-valid')

        const settings = {
            make:make.value, model:model.value, year:Number(year.value), description:description.value, price:Number(price.value), img:img.value, material:material.value
        }
        await post('data/catalog', settings)
        e.target.reset()
        page.redirect('/')
    } catch (error) {
        alert(error.message)
    }
}
