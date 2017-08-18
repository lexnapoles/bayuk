import readCategories from '../controllers/categories';

export default (router) => {
  router.get('/categories', readCategories);

  return router;
};
