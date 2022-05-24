import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton } from "./RadioButton";

test("RadioButton unbound click", () => {
  const onCheckedFoo = jest.fn();
  const onCheckedBar = jest.fn();
  const onCheckedBat = jest.fn();
  render(
    <div>
      <RadioButton name="g1" onChecked={onCheckedFoo}>
        Foo
      </RadioButton>
      <RadioButton name="g1" onChecked={onCheckedBar} defaultChecked>
        Bar
      </RadioButton>
      <RadioButton name="g1" onChecked={onCheckedBat}>
        Bat
      </RadioButton>
    </div>
  );

  const radios = screen.queryAllByRole("radio");
  expect(radios).toHaveLength(3);
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).toBeChecked();
  expect(radios[2]).not.toBeChecked();

  userEvent.click(radios[1]); // Already checked - no events
  expect(onCheckedFoo).toBeCalledTimes(0);
  expect(onCheckedBar).toBeCalledTimes(0);
  expect(onCheckedBat).toBeCalledTimes(0);
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).toBeChecked();
  expect(radios[2]).not.toBeChecked();

  userEvent.click(radios[2]); // Click radio button
  expect(onCheckedFoo).toBeCalledTimes(0);
  expect(onCheckedBar).toBeCalledTimes(0);
  expect(onCheckedBat).toBeCalledTimes(1);
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).not.toBeChecked();
  expect(radios[2]).toBeChecked();
});

test("RadioButton unbound click label", () => {
  const onCheckedFoo = jest.fn();
  const onCheckedBar = jest.fn();
  const onCheckedBat = jest.fn();
  render(
    <div>
      <RadioButton id="a" name="g1" onChecked={onCheckedFoo}>
        Foo
      </RadioButton>
      <RadioButton id="b" name="g1" onChecked={onCheckedBar} defaultChecked>
        Bar
      </RadioButton>
      <RadioButton id="c" name="g1" onChecked={onCheckedBat}>
        Bat
      </RadioButton>
    </div>
  );

  const radios = screen.queryAllByRole("radio");
  expect(radios).toHaveLength(3);
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).toBeChecked();
  expect(radios[2]).not.toBeChecked();

  userEvent.click(screen.getByText("Bat")); // click label
  expect(onCheckedFoo).toBeCalledTimes(0);
  expect(onCheckedBar).toBeCalledTimes(0);
  expect(onCheckedBat).toBeCalledTimes(1);
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).not.toBeChecked();
  expect(radios[2]).toBeChecked();
});

test("RadioButton disabled", () => {
  const onCheckedFoo = jest.fn();
  const onCheckedBar = jest.fn();
  const onCheckedBat = jest.fn();
  render(
    <div>
      <RadioButton id="a" name="g1" onChecked={onCheckedFoo}>
        Foo
      </RadioButton>
      <RadioButton id="b" name="g1" onChecked={onCheckedBar} defaultChecked>
        Bar
      </RadioButton>
      <RadioButton id="c" name="g1" onChecked={onCheckedBat} disabled>
        Bat
      </RadioButton>
    </div>
  );

  const radios = screen.queryAllByRole("radio");
  expect(radios).toHaveLength(3);

  userEvent.click(radios[2]); // Click radio button
  userEvent.click(screen.getByText("Bat")); // click label
  expect(onCheckedFoo).toBeCalledTimes(0);
  expect(onCheckedBar).toBeCalledTimes(0);
  expect(onCheckedBat).toBeCalledTimes(0);
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).toBeChecked();
  expect(radios[2]).not.toBeChecked();
});

test("RadioButton bound click", () => {
  const onCheckedFoo = jest.fn();
  const onCheckedBar = jest.fn();
  const onCheckedBat = jest.fn();
  render(
    <div>
      <RadioButton name="g1" checked={false} onChecked={onCheckedFoo}>
        Foo
      </RadioButton>
      <RadioButton name="g1" checked={true} onChecked={onCheckedBar}>
        Bar
      </RadioButton>
      <RadioButton name="g1" checked={false} onChecked={onCheckedBat}>
        Bat
      </RadioButton>
    </div>
  );

  const radios = screen.queryAllByRole("radio");
  expect(radios).toHaveLength(3);

  userEvent.click(radios[0]);
  expect(onCheckedFoo).toBeCalledTimes(1);
  expect(onCheckedBar).toBeCalledTimes(0);
  expect(onCheckedBat).toBeCalledTimes(0);
  expect(radios[0]).not.toBeChecked(); // Click has no effect
  expect(radios[1]).toBeChecked();
  expect(radios[2]).not.toBeChecked();
});
