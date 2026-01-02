const { test, expect, beforeEach, describe } = require('@playwright/test')

const blog = {
  title: 'Blog E2E',
  author: 'Testerr',
  url: 'hello.com',
  //likes: 0,
  //user: {
  //  username: 'mluukkai',
  //  name: 'Matti Luukkainen',
  //}
}

const user = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen',
}

const user2 = {
  username: 'erdem',
  name: 'Erdem Ahsen',
  password: 'pass123',
}



describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {

    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: user.name,
        username: user.username,
        password: user.password
      }
    })

    await request.post('http://localhost:3001/api/users', {
      data: {
        name: user2.name,
        username: user2.username,
        password: user2.password
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill(user.username)
      await page.getByLabel('password').fill(user.password)
      await page.getByRole('button', { name: 'login' }).click()
      // 
      await expect(page.getByText('Matti Luukkainen is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill(user.username)
      await page.getByLabel('password').fill("WRONG PASSword")
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

    describe('When logged in', () => {

        beforeEach(async ({ page }) => {
            await page.getByLabel('username').fill(user.username)
            await page.getByLabel('password').fill(user.password)
            await page.getByRole('button', { name: 'login' }).click()
            // await expect(page.getByText('Matti Luukkainen is logged in')).toBeVisible()
            await expect(page.getByText(`${user.name} is logged in`)).toBeVisible()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new blog' }).click()
            await page.getByLabel('title').fill(blog.title)
            await page.getByLabel('author').fill(blog.author)
            await page.getByLabel('url').fill(blog.url)
            await page.getByRole('button', { name: 'addBlog' }).click()
            // checking the notification
            await expect(page.getByText(`New blog ${blog.title} by ${blog.author} is added`)).toBeVisible()
            await expect(page.getByText(`${blog.title} - ${blog.author}`)).toBeVisible()
        })

        describe('After creating the blog', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'Create new blog' }).click()
                await page.getByLabel('title').fill(blog.title)
                await page.getByLabel('author').fill(blog.author)
                await page.getByLabel('url').fill(blog.url)
                await page.getByRole('button', { name: 'addBlog' }).click()
                // checking the notification
                await expect(page.getByText(`New blog ${blog.title} by ${blog.author} is added`)).toBeVisible()
                await expect(page.getByText(`${blog.title} - ${blog.author}`)).toBeVisible()

                
            })

            test('a new blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.getByText("likes: 0")).toBeVisible()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText("likes: 1")).toBeVisible()
            })
            
            test('created blog can be deleted', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                //await expect(page.getByText("likes: 0")).toBeVisible()

                page.on('dialog', dialog => dialog.accept());

                await page.getByRole('button', { name: 'remove' }).click()

                await page.reload();

                await expect(page.getByText('Blog E2E')).not.toBeVisible()
                //await expect(page.getByText("likes: 1")).toBeVisible()
            })

            describe('After creating the blog', () => {
              beforeEach(async ({ page }) => {
                //await page.getByRole('button', { name: 'view' }).click()
                //await expect(page.getByText("likes: 0")).toBeVisible()
                //await page.getByRole('button', { name: 'like' }).click()
                //await expect(page.getByText("likes: 1")).toBeVisible()
                // like the post created before logging out
                await page.getByRole('button', { name: 'logout' }).click()

                await page.getByLabel('username').fill(user2.username)
                await page.getByLabel('password').fill(user2.password)
                await page.getByRole('button', { name: 'login' }).click()

              })

              test('remove can be seen by only the creator of the blog', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()

                //await page.getByRole('button', { name: 'remove' }).not.toBeVisible()
                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
              })
            })
            
        })
    })

})