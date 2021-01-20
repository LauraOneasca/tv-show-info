import { css } from 'styled-components';

export default css`
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    width: 37%;
  }

  .sidebar {
    &__image {
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;

      ${({ imageUrl }) =>
        imageUrl &&
        css`
          background-image: url(${imageUrl});
        `}
    }

    &__content {
      min-height: 30rem;
      overflow: hidden;
    }

    &__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4rem;
      border-bottom: 0.1rem solid #9797974d;
    }

    &__title {
      font-size: 2.7rem;
      line-height: 3.2rem;
      font-weight: bold;
      margin-bottom: 0.6rem;
    }

    &__info {
      font-size: 1.9rem;
      line-height: 2.2rem;
    }

    &__rating {
      display: flex;
      align-items: center;

      &__star {
        margin-right: 1.7rem;
      }
    }

    &__main-info {
      padding: 4rem;
      text-align: left;
    }
  }
`;
