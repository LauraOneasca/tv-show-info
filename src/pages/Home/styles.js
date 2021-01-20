import { css } from 'styled-components';
import arrowSvg from './tail-right.svg';

export default css`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row;
    height: 100vh;
    min-height: 60rem;
  }

  .main-view {
    box-sizing: border-box;
    background-color: black;
    height: 100%;
    padding-left: 1.6rem;
    padding-top: 1.6rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    :before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: url('https://picsum.photos/414/600');
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.5;
    }

    :after {
      content: '';
      background: linear-gradient(180.78deg, rgba(0, 0, 0, 0.0001) 30.79%, rgba(0, 0, 0, 0.29713) 87.89%);
      width: 100%;
      height: 30rem;
      position: absolute;
      left: 0;
      bottom: 0;
    }

    @media (min-width: 414px) {
      :before {
        background-image: url('https://picsum.photos/768/600');
      }
    }

    @media (min-width: 768px) {
      padding-left: 4rem;

      :before {
        background-image: url('https://picsum.photos/1024/600');
      }
    }

    @media (min-width: 1024px) {
      width: 63%;
      padding-left: 10rem;

      :before {
        background-image: url('https://picsum.photos/1440/900');
      }
    }
  }

  .series-details {
    text-align: left;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 49rem;
    z-index: 1;

    h1 {
      font-size: 7.4rem;
      line-height: 8.7rem;
      margin: 0;
    }

    h2 {
      font-size: 2.3rem;
      line-height: 2.7rem;
      font-weight: normal;
      margin: 0;
    }
  }

  .episode-card {
    background-color: yellow;
    width: 37%;
    height: 100%;
  }

  .carousel-wrapper {
    height: 30rem;
    z-index: 1;
  }

  .carousel {
    &__container {
      position: relative;
      margin-left: auto;
      overflow: hidden;
    }

    .sliderAnimation___300FY {
      transition: transform 0.5s;
      transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      will-change: transform;
    }

    &__slider {
      @media (min-width: 1024px) {
        margin-right: -8rem;
      }
    }

    &__slide {
      position: relative;
      cursor: pointer;
      padding-right: 2.8rem;
    }

    &__inner-slide {
      max-width: 20rem;
    }

    &__buttons {
      display: flex;
      justify-content: flex-end;
    }

    &__episode {
      &__image {
        width: 100%;
        height: 13.4rem;
        margin-bottom: 1.9rem;
        filter: brightness(0.5);
        transition: filter 4ms ease-in;

        &--active {
          filter: none;
          transition: filter 4ms ease-in;
        }
      }

      &__number {
        position: absolute;
        left: 0;
        top: 0;
        background-color: white;
        font-size: 1.6rem;
        line-height: 1.9rem;
        font-weight: bold;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__title {
        font-size: 1.5rem;
        line-height: 1.8rem;
        color: white;
        font-weight: bold;
        text-align: left;
        margin-bottom: 1rem;
      }

      &__plot {
        color: white;
        font-size: 1.3rem;
        line-height: 1.5rem;
        opacity: 0.8;
        text-align: left;
        max-height: 4.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    .carousel__slider-tray--horizontal {
      display: flex;
      list-style: none;
      padding-left: 0;

      li:last-of-type {
        @media (min-width: 1024px) {
          margin-right: 6rem;
        }
      }
    }

    &__buttons {
      padding-right: 2.3rem;
    }

    &__button {
      background-image: url(${arrowSvg});
      height: 2.1rem;
      width: 2.9rem;
      background-color: transparent;
      border: none;
      cursor: pointer;

      :disabled {
        opacity: 0.2;
      }

      &--back {
        transform: rotate(180deg);
        margin-right: 1.6rem;
      }
    }
  }
`;
